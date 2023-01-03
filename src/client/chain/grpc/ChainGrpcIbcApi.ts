import { Query as IBCQuery } from '@routerprotocol/chain-api/ibc/applications/transfer/v1/query_pb_service';
import {
  QueryDenomTraceRequest,
  QueryDenomTraceResponse,
  QueryDenomTracesRequest,
  QueryDenomTracesResponse,
} from '@routerprotocol/chain-api/ibc/applications/transfer/v1/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';

/**
 * @group gRPC API
 */
export class ChainGrpcIbcApi extends BaseConsumer {
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
