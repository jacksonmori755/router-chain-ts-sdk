import {
  QueryDelegationRewardsRequest,
  QueryDelegationRewardsResponse,
  QueryDelegationTotalRewardsRequest,
  QueryDelegationTotalRewardsResponse,
  QueryParamsRequest as QueryDistributionParamsRequest,
  QueryParamsResponse as QueryDistributionParamsResponse,
} from '@routerprotocol/chain-api/cosmos/distribution/v1beta1/query_pb';
import { Query as DistributionQuery } from '@routerprotocol/chain-api/cosmos/distribution/v1beta1/query_pb_service';
import { Coin } from '../../../types';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcDistributionTransformer } from '../transformers';
import { ValidatorRewards } from '../types/distribution';

/**
 * @category Chain Grpc API
 */
export class ChainGrpcDistributionApi extends BaseConsumer {
  async fetchModuleParams() {
    const request = new QueryDistributionParamsRequest();

    try {
      const response = await this.request<
        QueryDistributionParamsRequest,
        QueryDistributionParamsResponse,
        typeof DistributionQuery.Params
      >(request, DistributionQuery.Params);

      return ChainGrpcDistributionTransformer.moduleParamsResponseToModuleParams(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  async fetchDelegatorRewardsForValidator({
    delegatorAddress,
    validatorAddress,
  }: {
    delegatorAddress: string;
    validatorAddress: string;
  }) {
    const request = new QueryDelegationRewardsRequest();
    request.setValidatorAddress(validatorAddress);
    request.setDelegatorAddress(delegatorAddress);

    try {
      const response = await this.request<
        QueryDelegationRewardsRequest,
        QueryDelegationRewardsResponse,
        typeof DistributionQuery.DelegationRewards
      >(request, DistributionQuery.DelegationRewards);

      return ChainGrpcDistributionTransformer.delegationRewardResponseToReward(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  async fetchDelegatorRewardsForValidatorNoThrow({
    delegatorAddress,
    validatorAddress,
  }: {
    delegatorAddress: string;
    validatorAddress: string;
  }) {
    const request = new QueryDelegationRewardsRequest();
    request.setValidatorAddress(validatorAddress);
    request.setDelegatorAddress(delegatorAddress);

    try {
      const response = await this.request<
        QueryDelegationRewardsRequest,
        QueryDelegationRewardsResponse,
        typeof DistributionQuery.DelegationRewards
      >(request, DistributionQuery.DelegationRewards);

      return ChainGrpcDistributionTransformer.delegationRewardResponseToReward(
        response
      );
    } catch (e) {
      //@ts-ignore
      if (e.message.includes('does not exist')) {
        return [] as Coin[];
      }
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  async fetchDelegatorRewards(injectiveAddress: string) {
    const request = new QueryDelegationTotalRewardsRequest();
    request.setDelegatorAddress(injectiveAddress);

    try {
      const response = await this.request<
        QueryDelegationTotalRewardsRequest,
        QueryDelegationTotalRewardsResponse,
        typeof DistributionQuery.DelegationTotalRewards
      >(request, DistributionQuery.DelegationTotalRewards);

      return ChainGrpcDistributionTransformer.totalDelegationRewardResponseToTotalReward(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  async fetchDelegatorRewardsNoThrow(injectiveAddress: string) {
    const request = new QueryDelegationTotalRewardsRequest();
    request.setDelegatorAddress(injectiveAddress);

    try {
      const response = await this.request<
        QueryDelegationTotalRewardsRequest,
        QueryDelegationTotalRewardsResponse,
        typeof DistributionQuery.DelegationTotalRewards
      >(request, DistributionQuery.DelegationTotalRewards);

      return ChainGrpcDistributionTransformer.totalDelegationRewardResponseToTotalReward(
        response
      );
    } catch (e) {
      //@ts-ignore
      if (e.message.includes('does not exist')) {
        return [] as ValidatorRewards[];
      }
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
