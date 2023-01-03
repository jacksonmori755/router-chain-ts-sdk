import { Query as InboundQuery } from '@routerprotocol/chain-api/inbound/query_pb_service';
import {
  QueryGetIncomingTxRequest,
  QueryGetIncomingTxResponse
} from '@routerprotocol/chain-api/inbound/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcInboundTransformer } from '../transformers'

/**
 * @category Chain Grpc API
 */
export class ChainGrpcInboundApi extends BaseConsumer {

  /**
   * To get incomming transaction.
   * 
   * @param chainType 
   * @param chainId 
   * @param eventNonce 
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
