import { Query as IBCQuery } from '@routerprotocol/chain-api/ibc/applications/transfer/v1/query_pb_service';
import {
  QueryDenomTraceRequest,
  QueryDenomTraceResponse,
  QueryDenomTracesRequest,
  QueryDenomTracesResponse,
} from '@routerprotocol/chain-api/ibc/applications/transfer/v1/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';

/**
 * The IBC module provides functions for denom trace (base denom and its path)
 * 
 * @group gRPC API
 * 
 * @example
 * To use IBC methods, initialise a {@link ChainGrpcIbcApi} object to with a gRPC endpoint. An endpoint can be retrieved by using {@link networkEndpoints}.
 * ```ts
 * const endpoint =  getEndpointsForNetwork(Network.Devnet).grpcEndpoint;
 * const client = new ChainGrpcIbcApi(endpoint);
 * const response = await client.fetchDenomsTrace();
 * ```
 */
export class ChainGrpcIbcApi extends BaseConsumer {
  /**
   * 
   * @param hash 
   * @returns 
   */
  async fetchDenomTrace(hash: string) {
    const request = new QueryDenomTraceRequest();
    request.setHash(hash);

    try {
      const response = await this.request<
        QueryDenomTraceRequest,
        QueryDenomTraceResponse,
        typeof IBCQuery.DenomTrace
      >(request, IBCQuery.DenomTrace);

      return response.getDenomTrace()!.toObject();
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @returns 
   */
  async fetchDenomsTrace() {
    const request = new QueryDenomTracesRequest();

    try {
      const response = await this.request<
        QueryDenomTracesRequest,
        QueryDenomTracesResponse,
        typeof IBCQuery.DenomTraces
      >(request, IBCQuery.DenomTraces);

      return response.getDenomTracesList().map(trace => trace.toObject());
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
