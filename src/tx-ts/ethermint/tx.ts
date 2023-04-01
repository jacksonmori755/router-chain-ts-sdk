import {
  Eip712ConvertFeeArgs,
  Eip712ConvertTxArgs,
  getEip712TypedData,
  Msgs,
} from '../../core';
import { EthereumChainId } from '../../ts-types';
import { TxRaw } from './lib/@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb.js';
import { createCosmosPayload, getPostOptions } from './utils';
import { TxContext, TxToSend } from './types';
import { DEFAULT_STD_FEE } from '../../utils';

export const getEtherMintTxPayload = (
  context: TxContext,
  eipData: {
    msgs: Msgs | Msgs[];
    tx: Eip712ConvertTxArgs;
    fee?: Eip712ConvertFeeArgs;
    ethereumChainId: EthereumChainId;
  }
) => {
  const eip712Payload = getEip712TypedData(eipData);
  const cosmosMsg = Array.isArray(eipData.msgs)
    ? eipData.msgs.map(msg => msg.toDirectSign())
    : eipData.msgs.toDirectSign();
  console.log('SDK cosmosMsg =>', cosmosMsg);
  console.log('SDK json.stringify cosmosMsg =>', JSON.stringify(cosmosMsg));
  const cosmosPayload = createCosmosPayload(
    context,
    cosmosMsg,
    eipData.fee ?? DEFAULT_STD_FEE
  );
  console.log('SDK cosmosPayload =>', cosmosPayload);
  return {
    signDirect: cosmosPayload.signDirect,
    legacyAmino: cosmosPayload.legacyAmino,
    eipToSign: eip712Payload,
  };
};

export function createTxRawForBroadcast(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  signatures: Uint8Array[]
) {
  //@ts-ignore
  const message = new TxRaw({
    bodyBytes,
    authInfoBytes,
    signatures,
  });
  return {
    message,
    path: TxRaw.typeName,
  };
}

export const simulateRawTx = async (signedTx: TxToSend, nodeUrl: string) => {
  const postOptions = getPostOptions(signedTx);
  const broadcastEndpoint = `${nodeUrl}${'/cosmos/tx/v1beta1/simulate'}`;
  const broadcastPost = await fetch(broadcastEndpoint, postOptions);

  const response = await broadcastPost.json();

  return response;
};

export const broadcastRawTx = async (signedTx: TxToSend, nodeUrl: string) => {
  const postOptions = getPostOptions(signedTx);
  const broadcastEndpoint = `${nodeUrl}${'/cosmos/tx/v1beta1/txs'}`;
  const broadcastPost = await fetch(broadcastEndpoint, postOptions);

  const response = await broadcastPost.json();

  return response;
};
