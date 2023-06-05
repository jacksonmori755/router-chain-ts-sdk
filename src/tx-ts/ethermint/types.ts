import { Message as ProtoMessage, AnyMessage } from '@bufbuild/protobuf';

export interface EthermintChain {
  chainId: number;
  cosmosChainId: string;
}

export interface Sender {
  accountAddress: string;
  sequence: number;
  accountNumber: number;
  pubkey: string;
}

export interface FeeType {
  amount: string;
  denom: string;
  gas: string;
}

export interface TxContext {
  chain: EthermintChain;
  sender: Sender;
  memo: string;
}

export interface MessageGenerated<T extends ProtoMessage<T> = AnyMessage> {
  message: any;
  path: string;
}

export interface TxToSend {
  message: {
    toBinary: () => Uint8Array;
  };
  path: string;
}

export enum BroadcastMode {
  Unspecified = 'BROADCAST_MODE_UNSPECIFIED',
  Block = 'BROADCAST_MODE_BLOCK',
  Sync = 'BROADCAST_MODE_SYNC',
  Async = 'BROADCAST_MODE_ASYNC',
}
