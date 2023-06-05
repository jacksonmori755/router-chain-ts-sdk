import { Query as MultiChainQuery } from '@routerprotocol/chain-api/multichain/query_pb_service';
import {
  QueryAllChainConfigRequest,
  QueryAllChainConfigResponse,
  QueryGetChainConfigRequest,
  QueryGetChainConfigResponse,
  QueryAllContractConfigRequest,
  QueryAllContractConfigResponse,
  QueryGetContractConfigRequest,
  QueryGetContractConfigResponse
} from '@routerprotocol/chain-api/multichain/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';

/**
 * The Multichain module is responsible for persisting the configuration of all supported chains by the Router chain and provides chain configuration related methods.
 * 
 * @group gRPC API
 * 
 * @example
 * To use Multichain methods, initialise a {@link ChainGrpcMultiChainApi} object to with a gRPC endpoint. An endpoint can be retrieved by using {@link networkEndpoints}.
 * ```ts
 * const endpoint =  getEndpointsForNetwork(Network.Devnet).grpcEndpoint;
 * const bankClient = new ChainGrpcMultiChainApi(endpoint.grpcEndpoint);
 * const response = await bankClient.fetchAllChainConfig();
 * ```
 */
export class ChainGrpcMultiChainApi extends BaseConsumer {
  /**
   *
   * @param chainType chain type.
   * @param chainId chain ID.
   * @returns chain configuration.
   */
  async fetchChainConfig(chainId: string) {
    const request = new QueryGetChainConfigRequest();
    request.setChainId(chainId);

    try {
      const response = await this.request<
        QueryGetChainConfigRequest,
        QueryGetChainConfigResponse,
        typeof MultiChainQuery.ChainConfig
      >(request, MultiChainQuery.ChainConfig);

      return response.toObject();
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

      return response.toObject();
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @param chainId 
   * @returns 
   */
  async fetchContractConfig(chainId: string) {
    const request = new QueryGetContractConfigRequest();
    request.setChainId(chainId);

    try {
      const response = await this.request<
      QueryGetContractConfigRequest,
      QueryGetContractConfigResponse,
        typeof MultiChainQuery.ContractConfig
      >(request, MultiChainQuery.ContractConfig);

      return response.toObject();
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @returns 
   */
  async fetchAllContractConfig() {
    const request = new QueryAllContractConfigRequest();

    try {
      const response = await this.request<
      QueryAllContractConfigRequest,
      QueryAllContractConfigResponse,
        typeof MultiChainQuery.ContractConfigAll
      >(request, MultiChainQuery.ContractConfigAll);

      return response.toObject();
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

}