import { Query as MetastoreQuery } from '@routerprotocol/chain-api/metastore/query_pb_service';

import {
    QueryAllMetaInfoRequest,
    QueryAllMetaInfoResponse,
    QueryGetMetaInfoRequest,
    QueryGetMetaInfoResponse
} from '@routerprotocol/chain-api/metastore/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcMetastoreTransformer } from '../transformers';


export class ChainGrpcMetastoreApi extends BaseConsumer {

  async fetchAllMetastoreInfo() {
    const request = new QueryAllMetaInfoRequest();

    try {
      const response = await this.request<
      QueryAllMetaInfoRequest,
      QueryAllMetaInfoResponse,
        typeof MetastoreQuery.MetaInfoAll
      >(request, MetastoreQuery.MetaInfoAll);

      return ChainGrpcMetastoreTransformer.allMetastoreInfo(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  async fetchMetastoreInfo(chainId: string, dappAddress: string) {
    const request = new QueryGetMetaInfoRequest();
    request.setChainId(chainId)
    request.setDappAddress(dappAddress)

    try {
      const response = await this.request<
      QueryGetMetaInfoRequest,
      QueryGetMetaInfoResponse,
        typeof MetastoreQuery.MetaInfo
      >(request, MetastoreQuery.MetaInfo);

      return ChainGrpcMetastoreTransformer.metastoreInfo(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }


}
