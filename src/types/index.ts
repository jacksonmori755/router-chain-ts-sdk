import { Coin as GrpcCoin } from '@routerprotocol/chain-api/cosmos/base/v1beta1/coin_pb';

export * from './pagination';

export interface Coin {
  denom: string;
  amount: string;
}

export enum StreamOperation {
  Insert = 'insert',
  Delete = 'delete',
  Replace = 'replace',
  Update = 'update',
  Invalidate = 'invalidate',
}

export { GrpcCoin };

export * from './tx-grpc-client';
export * from './tx-rest-client';