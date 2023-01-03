import { Query as MultiChainQuery } from '@routerprotocol/chain-api/multichain/query_pb_service';
import { 
    QueryAllChainConfigRequest,
    QueryAllChainConfigResponse, 
    QueryGetChainConfigRequest, 
    QueryGetChainConfigResponse
 } from '@routerprotocol/chain-api/multichain/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcMultiChainTransformer } from '../transformers';

export class ChainGrpcMultiChainApi extends BaseConsumer {

    /**
     * 
     * @param chainType chain type.
     * @param chainId chain ID.
     * @returns chain configuration.
     */
    async fetchChainConfig(chainType: number, chainId: string) {
        const request = new QueryGetChainConfigRequest();
        request.setChainType(chainType);
        request.setChainId(chainId);

        try {
            const response = await this.request<
            QueryGetChainConfigRequest,
            QueryGetChainConfigResponse,
            typeof MultiChainQuery.ChainConfig
            >(request, MultiChainQuery.ChainConfig);

            console.log("api call success")

            return ChainGrpcMultiChainTransformer.chainConfig(response);
        } catch (e) {
            //@ts-ignore
            throw new Error(e.message);
        }
    }

    /**
     * 
     * @returns chain configuration list for all supported chains.
     */
    async fetchAllChainConfig() {
        const request = new QueryAllChainConfigRequest();

        try {
            const response = await this.request<
            QueryAllChainConfigRequest,
            QueryAllChainConfigResponse,
            typeof MultiChainQuery.ChainConfigAll
            >(request, MultiChainQuery.ChainConfigAll);

            return ChainGrpcMultiChainTransformer.allChainConfig(response);
        } catch (e) {
            //@ts-ignore
            throw new Error(e.message);
        }
    }
}