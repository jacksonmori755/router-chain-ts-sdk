import { Keccak } from 'sha3';
import { Any } from '@bufbuild/protobuf';
//import { Message } from 'google-protobuf';
import {
  TxBody,
  Fee,
  SignerInfo,
  ModeInfo,
  // eslint-disable-next-line camelcase
  ModeInfo_Single,
  AuthInfo,
  SignDoc,
} from './lib/@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb.js';
import { PubKey as SECP256k1 } from './lib/@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/crypto/secp256k1/keys_pb.js';
import { SignMode } from './lib/@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb.js';
import { Coin } from './lib/@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb.js';
import { PubKey } from './lib/@buf/evmos_ethermint.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb.js';
import { MsgArg } from '../../types';
import {
  BroadcastMode,
  FeeType,
  MessageGenerated,
  TxContext,
  TxToSend,
} from './types.js';
import {
  DEFAULT_GAS_LIMIT,
  DEFAULT_STD_FEE,
  ROUTER_DENOM,
} from '../../utils/constants.js';
import { Eip712ConvertFeeArgs } from '../../core/index.js';

const wrapTypeToArray = <T>(obj: T | T[]) => {
  return Array.isArray(obj) ? obj : [obj];
};

function createAnyMessage(msg: MessageGenerated) {
  let binaryValue;
  try {
    binaryValue = msg.message.serializeBinary();
  } catch (e) {
    binaryValue = msg.message.toBinary();
  }
  //@ts-ignore
  return new Any({
    typeUrl: `${msg.path.startsWith('/') ? msg.path : '/' + msg.path}`,
    value: binaryValue,
  });
}

function createBodyWithMultipleMessages(messages: MsgArg[], memo: string) {
  const content: Any[] = [];
  messages.forEach(message => {
    content.push(
      createAnyMessage({
        message: message.message,
        path: message.type,
      })
    );
  });
  //@ts-ignore
  return new TxBody({
    messages: content,
    memo,
  });
}

function createSignerInfo(
  algo: string,
  publicKey: Uint8Array,
  sequence: number,
  mode: number
) {
  let pubkey: any;

  // NOTE: secp256k1 is going to be removed from evmos
  if (algo === 'secp256k1') {
    pubkey = {
      //@ts-ignore
      message: new SECP256k1({
        key: publicKey,
      }),
      path: 'cosmos.crypto.secp256k1.PubKey',
    };
  } else {
    // NOTE: assume ethsecp256k1 by default because after mainnet is the only one that is going to be supported
    pubkey = {
      //@ts-ignore
      message: new PubKey({
        key: publicKey,
      }),
      path: 'ethermint.crypto.v1.ethsecp256k1.PubKey',
    };
  }
  //@ts-ignore
  const signerInfo = new SignerInfo({
    publicKey: createAnyMessage(pubkey),
    //@ts-ignore
    modeInfo: new ModeInfo({
      sum: {
        //@ts-ignore
        value: new ModeInfo_Single({
          mode,
        }),
        case: 'single',
      },
    }),
    sequence: BigInt(sequence),
  });

  return signerInfo;
}

function createAuthInfo(signerInfo: SignerInfo, fee: Fee) {
  //@ts-ignore
  return new AuthInfo({
    signerInfos: [signerInfo],
    fee,
  });
}

function createSigDoc(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number
) {
  //@ts-ignore
  return new SignDoc({
    bodyBytes,
    authInfoBytes,
    chainId,
    accountNumber: BigInt(accountNumber),
  });
}

function createFee(fee: string, denom: string, gasLimit: number) {
  //@ts-ignore
  return new Fee({
    amount: [
      //@ts-ignore
      new Coin({
        denom,
        amount: fee,
      }),
    ],
    gasLimit: BigInt(gasLimit),
  });
}

function createTransactionWithMultipleMessages(
  messages: MsgArg[],
  memo: string,
  fee: FeeType,
  gasLimit: number,
  algo: string,
  pubKey: string,
  sequence: number,
  accountNumber: number,
  chainId: string
) {
  const body = createBodyWithMultipleMessages(messages, memo);
  const feeMessage = createFee(fee.amount, fee.denom, gasLimit);
  const pubKeyDecoded = Buffer.from(pubKey, 'base64');

  // AMINO
  const signInfoAmino = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    SignMode.LEGACY_AMINO_JSON
  );

  const authInfoAmino = createAuthInfo(signInfoAmino, feeMessage);

  const signDocAmino = createSigDoc(
    body.toBinary(),
    authInfoAmino.toBinary(),
    chainId,
    accountNumber
  );

  const hashAmino = new Keccak(256);
  hashAmino.update(Buffer.from(signDocAmino.toBinary()));
  const toSignAmino = hashAmino.digest('binary');

  // SignDirect
  const signInfoDirect = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    SignMode.DIRECT
  );

  const authInfoDirect = createAuthInfo(signInfoDirect, feeMessage);

  const signDocDirect = createSigDoc(
    body.toBinary(),
    authInfoDirect.toBinary(),
    chainId,
    accountNumber
  );

  const hashDirect = new Keccak(256);
  hashDirect.update(Buffer.from(signDocDirect.toBinary()));
  const toSignDirect = hashDirect.digest('binary');

  return {
    legacyAmino: {
      body,
      authInfo: authInfoAmino,
      signBytes: toSignAmino.toString('base64'),
    },
    signDirect: {
      body,
      authInfo: authInfoDirect,
      signBytes: toSignDirect.toString('base64'),
    },
  };
}

export const createCosmosPayload = (
  context: TxContext,
  cosmosPayload: MsgArg | MsgArg[],
  fee: Eip712ConvertFeeArgs
) => {
  const { sender, chain, memo } = context;
  const messages = wrapTypeToArray(cosmosPayload);
  return createTransactionWithMultipleMessages(
    messages,
    memo,
    {
      amount: fee.amount
        ? fee.amount[0].amount
        : DEFAULT_STD_FEE.amount[0].amount,
      denom: ROUTER_DENOM,
      gas: fee.gas ? fee.gas : DEFAULT_STD_FEE.gas,
    },
    parseInt(fee.gas ?? DEFAULT_GAS_LIMIT.toString(), 10),
    'ethsecp256',
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    chain.cosmosChainId
  );
};

export function generatePostBodyBroadcast(
  txRaw: TxToSend,
  broadcastMode: string = BroadcastMode.Sync
) {
  const txBase64 = Buffer.from(txRaw.message.toBinary()).toString('base64');
  return `{ "tx_bytes": "${txBase64}", "mode": "${broadcastMode}" }`;
}

export const getPostOptions = (signedTx: TxToSend) => {
  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: generatePostBodyBroadcast(signedTx),
  };
  return postOptions;
};
