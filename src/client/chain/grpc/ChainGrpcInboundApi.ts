import { Query as InboundQuery } from '@routerprotocol/chain-api/inbound/query_pb_service';
import {
  QueryGetIncomingTxRequest,
  QueryGetIncomingTxResponse
} from '@routerprotocol/chain-api/inbound/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcInboundTransformer } from '../transformers'

/**
 * The Inbound module manages all inbound requests from third-party chains.
 * 
 * @group gRPC API
 * 
 * @example
 * To use Inbound methods, initialise a {@link ChainGrpcInboundApi} object to with a gRPC endpoint. An endpoint can be retrieved by using {@link networkEndpoints}.
 * ```ts
 * const endpoint =  getEndpointsForNetwork(Network.Devnet).grpcEndpoint;
 * const client = new ChainGrpcInboundApi(endpoint.grpcEndpoint);
 * const response = await client.fetchIncomingTx(0, "7545", 4);
 * ```
 */
export class ChainGrpcInboundApi extends BaseConsumer {

  /**
   * To get incomming transaction.
   * 
   * @param chainType source network chain type.
   * @param chainId source network chain ID.
   * @param eventNonce nonce.
   * @returns incoming transaction.
   */
  async fetchIncomingTx(
    chainType: number,
    chainId: string,
    eventNonce: number
  ) {
    
    const request = new QueryGetIncomingTxRequest();
    request.setChainType(chainType);
    request.setChainId(chainId);
    request.setEventNonce(eventNonce)

    try {
      const response = await this.request<
        QueryGetIncomingTxRequest,
        QueryGetIncomingTxResponse,
        typeof InboundQuery.IncomingTx
      >(request, InboundQuery.IncomingTx);

      return ChainGrpcInboundTransformer.incomingTx(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
