import { Any } from 'google-protobuf/google/protobuf/any_pb';
import {
  TxBody,
  TxRaw,
} from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_pb';
import { DirectSignResponse } from '@cosmjs/proto-signing';
import { SignDoc as CosmosSignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { createTransaction } from './tx';
import {
  BaseAccount,
  BigNumberInBase,
  ChainRestAuthApi,
  ChainRestTendermintApi,
  CreateTransactionArgs,
  DEFAULT_TIMEOUT_HEIGHT,
  EthereumChainId,
  getAddressFromRouterAddress,
  getRouterAddress,
  MessageGenerated,
} from '../';
import { Msgs } from '../core';
import { GeneralException } from '../exceptions';
//import { ExtensionOptionsWeb3Tx } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_ext_pb';
import { ExtensionOptionsWeb3Tx } from '@routerprotocol/chain-api/types/tx_ext_pb';
export const createAnyMessage = (msg: MessageGenerated) => {
  const message = new Any();
  message.setTypeUrl(`${msg.type.startsWith('/') ? '' : '/'}${msg.type}`);
  message.setValue(msg.value.serializeBinary());

  return message;
};

export const createAny = (value: any, type: string) => {
  const message = new Any();
  message.setTypeUrl(type);
  message.setValue(value);

  return message;
};

/**
 * Used when we want to pass a Msg class instead of the {type, message}
 * object of the Message (using the toDirectSign() method)
 * @returns
 */
export const createTransactionFromMsg = (
  params: Omit<CreateTransactionArgs, 'message'> & { message: Msgs | Msgs[] }
) => {
  const messages = Array.isArray(params.message)
    ? params.message
    : [params.message];

  return createTransaction({
    ...params,
    message: messages.map(m => m.toDirectSign()),
  });
};

/**
 * Used when we get a DirectSignResponse from
 * Cosmos native wallets like Keplr, Leap, etc after
 * the TxRaw has been signed.
 *
 * The reason why we need to create a new TxRaw and
 * not use the one that we passed to signing is that the users
 * can change the gas fees and that will alter the original
 * TxRaw which will cause signature miss match if we broadcast
 * that transaction on chain
 * @returns TxRaw
 */
export const createTxRawFromSigResponse = (
  signatureResponse: DirectSignResponse
) => {
  const txRaw = new TxRaw();
  txRaw.setAuthInfoBytes(signatureResponse.signed.authInfoBytes);
  txRaw.setBodyBytes(signatureResponse.signed.bodyBytes);
  txRaw.setSignaturesList([signatureResponse.signature.signature]);

  return txRaw;
};

/**
 * Used when we don't have account details and block details
 * and we pass the message and the user's address only
 * @returns
 */
export const createTransactionForAddressAndMsg = async (
  params: Omit<
    CreateTransactionArgs,
    'message' | 'sequence' | 'pubKey' | 'accountNumber'
  > & {
    message: Msgs | Msgs[];
    address: string;
    pubKey?: string;
    endpoint: string;
  }
) => {
  const messages = Array.isArray(params.message)
    ? params.message
    : [params.message];

  // Clients
  const chainRestAuthApi = new ChainRestAuthApi(params.endpoint);
  const tendermintRestApi = new ChainRestTendermintApi(params.endpoint);

  /** Account Details * */
  const accountDetails = await chainRestAuthApi.fetchCosmosAccount(
    params.address
  );
  const baseAccount = BaseAccount.fromRestCosmosApi(accountDetails);

  /** Block Details */
  const latestBlock = await tendermintRestApi.fetchLatestBlock();
  const latestHeight = latestBlock.header.height;
  const timeoutHeight = new BigNumberInBase(latestHeight).plus(
    DEFAULT_TIMEOUT_HEIGHT
  );

  const pubKey = params.pubKey || baseAccount.pubKey.key;

  if (!pubKey) {
    throw new GeneralException(
      new Error(`The pubKey for ${params.address} is missing.`)
    );
  }

  return createTransaction({
    ...params,
    pubKey:
      params.pubKey || Buffer.from(baseAccount.pubKey.key).toString('base64'),
    sequence: Number(baseAccount.sequence),
    accountNumber: Number(baseAccount.accountNumber),
    timeoutHeight: timeoutHeight.toNumber(),
    message: messages.map(m => m.toDirectSign()),
  });
};

export const createTransactionAndCosmosSignDoc = (
  args: CreateTransactionArgs
) => {
  const result = createTransaction(args);
  const [signer] = Array.isArray(result.signers)
    ? result.signers
    : [result.signers];

  return {
    ...result,
    cosmosSignDoc: CosmosSignDoc.fromPartial({
      bodyBytes: result.bodyBytes,
      authInfoBytes: result.authInfoBytes,
      accountNumber: signer.accountNumber,
      chainId: args.chainId,
    }),
  };
};

export const createCosmosSignDocFromTransaction = (args: {
  txRaw: TxRaw;
  chainId: string;
  accountNumber: number;
}) => {
  return CosmosSignDoc.fromPartial({
    bodyBytes: args.txRaw.getBodyBytes_asU8(),
    authInfoBytes: args.txRaw.getAuthInfoBytes_asU8(),
    accountNumber: args.accountNumber,
    chainId: args.chainId,
  });
};

export const createTransactionAndCosmosSignDocForAddressAndMsg = async (
  params: Omit<
    CreateTransactionArgs,
    'message' | 'sequence' | 'pubKey' | 'accountNumber'
  > & {
    message: Msgs | Msgs[];
    address: string;
    pubKey?: string;
    endpoint: string;
  }
) => {
  const result = await createTransactionForAddressAndMsg(params);
  const [signer] = Array.isArray(result.signers)
    ? result.signers
    : [result.signers];

  return {
    ...result,
    cosmosSignDoc: CosmosSignDoc.fromPartial({
      bodyBytes: result.bodyBytes,
      authInfoBytes: result.authInfoBytes,
      accountNumber: signer.accountNumber,
      chainId: params.chainId,
    }),
  };
};

export const createTxRawEIP712 = (
  txRaw: TxRaw,
  extension: ExtensionOptionsWeb3Tx
) => {
  const body = TxBody.deserializeBinary(txRaw.getBodyBytes_asU8());
  const extensionAny = createAny(
    extension.serializeBinary(),
    '/ethermint.types.v1.ExtensionOptionsWeb3Tx'
  );
  body.addExtensionOptions(extensionAny);

  txRaw.setBodyBytes(body.serializeBinary());

  return txRaw;
};

export const createWeb3Extension = ({
  ethereumChainId,
  feePayer,
  feePayerSig,
}: {
  ethereumChainId: EthereumChainId;
  feePayer?: string;
  feePayerSig?: Uint8Array;
}) => {
  const web3Extension = new ExtensionOptionsWeb3Tx();
  web3Extension.setTypeddatachainid(ethereumChainId);

  if (feePayer) {
    web3Extension.setFeepayer(feePayer);
  }

  if (feePayerSig) {
    web3Extension.setFeepayersig(feePayerSig);
  }

  return web3Extension;
};

export const getRouterSignerAddress = (address: string | undefined) => {
  if (!address) {
    return '';
  }

  if (address.startsWith('router')) {
    return address;
  }

  if (address.startsWith('0x')) {
    return getRouterAddress(address);
  }

  return '';
};

export const getEthereumSignerAddress = (address: string | undefined) => {
  if (!address) {
    return '';
  }

  if (address.startsWith('0x')) {
    return address;
  }

  if (address.startsWith('router')) {
    return getAddressFromRouterAddress(address);
  }

  return '';
};
