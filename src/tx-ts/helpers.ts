import { Any } from 'google-protobuf/google/protobuf/any_pb';
import { TxRaw } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_pb';
import { DirectSignResponse } from '@cosmjs/proto-signing';
import { SignDoc as CosmosSignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { createTransaction, CreateTransactionArgs } from './tx';
import { MessageGenerated } from '../';
import { Msgs } from '../core';

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

export const createTransactionAndCosmosSignDoc = (
  args: CreateTransactionArgs
) => {
  const result = createTransaction(args);

  return {
    ...result,
    cosmosSignDoc: CosmosSignDoc.fromPartial({
      bodyBytes: result.bodyBytes,
      authInfoBytes: result.authInfoBytes,
      accountNumber: result.accountNumber,
      chainId: args.chainId,
    }),
  };
};
