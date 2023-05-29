import {
    QueryAllChainConfigResponse, 
    QueryGetChainConfigResponse
} from '@routerprotocol/chain-api/multichain/query_pb';

import { ChainConfig } from '@routerprotocol/chain-api/multichain/chain_config_pb';
import { PageResponse } from '@routerprotocol/chain-api/cosmos/base/query/v1beta1/pagination_pb';
import { grpcPaginationToPagination } from '../../../utils/pagination';

export class ChainGrpcMultiChainTransformer {

  static chainConfig(
    response: QueryGetChainConfigResponse
  ): QueryGetChainConfigResponse.AsObject {
    
    const chainConfig: ChainConfig | undefined = response.getChainconfig();

    if (chainConfig == undefined) {
        return {
            chainconfig: undefined
        }
    }

    return {
      chainconfig : ChainGrpcMultiChainTransformer.getChainConfigObject(chainConfig)
    }
  }

  static allChainConfig(
    response: QueryAllChainConfigResponse
  ): QueryAllChainConfigResponse.AsObject {
    const chainConfigList: ChainConfig[] = response.getChainconfigList();
    const page: PageResponse | undefined = response.getPagination();

    return {
      chainconfigList: chainConfigList.map(ChainGrpcMultiChainTransformer.getChainConfigObject),
      pagination: grpcPaginationToPagination(page)
    }
  }

  private static getChainConfigObject(
    chainConfig: ChainConfig
  ) : ChainConfig.AsObject {

    return chainConfig.toObject();
  }
}
