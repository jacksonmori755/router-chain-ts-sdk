import {
  DelegationDelegatorReward as GrpcDelegationDelegatorReward,
  Params as GrpcDistributionParams,
} from '@routerprotocol/chain-api/cosmos/distribution/v1beta1/distribution_pb';
import { Coin } from '../../../ts-types';

export interface DistributionModuleParams {
  communityTax: string;
  baseProposerReward: string;
  bonusProposerReward: string;
  withdrawAddrEnabled: boolean;
}

export interface ValidatorRewards {
  rewards: Coin[];
  validatorAddress: string;
}

export { GrpcDelegationDelegatorReward, GrpcDistributionParams };
