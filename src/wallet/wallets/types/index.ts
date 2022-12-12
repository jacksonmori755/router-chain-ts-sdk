import { Msgs } from '../../..';
import { ChainId, EthereumChainId } from '../../..';
import { WalletStrategy } from '../../strategies/wallet';

export interface MsgBroadcasterTxOptions {
  memo?: string;
  address?: string /* @deprecated */;
  ethereumAddress?: string;
  routerAddress?: string;
  msgs: Msgs | Msgs[];
  feePrice?: string;
  feeDenom?: string;
  gasLimit?: number;
}

export interface MsgBroadcasterTxOptionsWithAddresses
  extends MsgBroadcasterTxOptions {
  ethereumAddress: string;
  routerAddress: string;
}

export interface MsgBroadcasterOptions {
  endpoints: {
    indexerApi: string;
    sentryGrpcApi: string;
    sentryHttpApi: string;
  };
  chainId: ChainId;
  ethereumChainId?: EthereumChainId;
  feePayerPubKey?: string;
  simulateTx?: boolean;
  walletStrategy: WalletStrategy;
}

export interface MsgBroadcasterOptionsLocal
  extends Omit<MsgBroadcasterOptions, 'feePayerPubKey' | 'walletStrategy'> {
  privateKey: string;
}

export interface SendTransactionOptions {
  tx: {
    from: string;
    to: string;
    gas: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string | null;
    data: any;
  };
  address: string;
}
