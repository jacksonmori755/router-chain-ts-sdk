import { Query as MintQuery } from '@routerprotocol/chain-api/cosmos/mint/v1beta1/query_pb_service';
import {
  QueryInflationRequest,
  QueryParamsRequest as QueryMintParamsRequest,
  QueryParamsResponse as QueryMintParamsResponse,
  QueryInflationResponse,
  QueryAnnualProvisionsRequest,
  QueryAnnualProvisionsResponse,
} from '@routerprotocol/chain-api/cosmos/mint/v1beta1/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import {
  cosmosSdkDecToBigNumber,
  uint8ArrayToString,
  BigNumberInBase,
} from '../../../utils';
import { ChainGrpcMintTransformer } from '../transformers/ChainGrpcMintTransformer';

/**
 * @group gRPC API
 */
export class ChainGrpcMintApi extends BaseConsumer {
  async fetchModuleParams() {
    const request = new QueryMintParamsRequest();

    try {
      const response = await this.request<
        QueryMintParamsRequest,
        QueryMintParamsResponse,
        typeof MintQuery.Params
      >(request, MintQuery.Params);

      return ChainGrpcMintTransformer.moduleParamsResponseToModuleParams(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  async fetchInflation() {
    const request = new QueryInflationRequest();

    try {
      const response = await this.request<
        QueryInflationRequest,
        QueryInflationResponse,
        typeof MintQuery.Inflation
      >(request, MintQuery.Inflation);

      return {
        inflation: cosmosSdkDecToBigNumber(
          new BigNumberInBase(uint8ArrayToString(response.getInflation()))
        ).toFixed(),
      };
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  async fetchAnnualProvisions() {
    const request = new QueryAnnualProvisionsRequest();

    try {
      const response = await this.request<
        QueryAnnualProvisionsRequest,
        QueryAnnualProvisionsResponse,
        typeof MintQuery.AnnualProvisions
      >(request, MintQuery.AnnualProvisions);

      return {
        annualProvisions: cosmosSdkDecToBigNumber(
          new BigNumberInBase(
            uint8ArrayToString(response.getAnnualProvisions())
          )
        ).toFixed(),
      };
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
