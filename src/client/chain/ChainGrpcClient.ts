import { ChainGrpcBankApi } from './grpc/ChainGrpcBankApi';
import { ChainGrpcAuthApi } from './grpc/ChainGrpcAuthApi';
import { ChainGrpcDistributionApi } from './grpc/ChainGrpcDistributionApi';
import { ChainGrpcGovApi } from './grpc/ChainGrpcGovApi';
import { ChainGrpcIbcApi } from './grpc/ChainGrpcIbcApi';
import { ChainGrpcMintApi } from './grpc/ChainGrpcMintApi';
import { ChainGrpcStakingApi } from './grpc/ChainGrpcStakingApi';

/**
 * @group gRPC API
 * @hidden
 */
export class ChainGrpcClient {
  auth: ChainGrpcAuthApi;

  bank: ChainGrpcBankApi;

  distribution: ChainGrpcDistributionApi;

  gov: ChainGrpcGovApi;

  ibc: ChainGrpcIbcApi;

  mint: ChainGrpcMintApi;

  staking: ChainGrpcStakingApi;

  constructor(endpoint: string) {
    this.auth = new ChainGrpcAuthApi(endpoint);
    this.bank = new ChainGrpcBankApi(endpoint);
    this.distribution = new ChainGrpcDistributionApi(endpoint);
    this.gov = new ChainGrpcGovApi(endpoint);
    this.ibc = new ChainGrpcIbcApi(endpoint);
    this.mint = new ChainGrpcMintApi(endpoint);
    this.staking = new ChainGrpcStakingApi(endpoint);
  }
}
