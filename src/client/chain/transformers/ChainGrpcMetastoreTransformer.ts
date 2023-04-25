import { PageResponse } from '@routerprotocol/chain-api/cosmos/base/query/v1beta1/pagination_pb';
import {
    QueryAllMetaInfoResponse,
    QueryGetMetaInfoResponse
} from '@routerprotocol/chain-api/metastore/query_pb';
import { MetaInfo } from '@routerprotocol/chain-api/metastore/meta_info_pb';

export class ChainGrpcMetastoreTransformer {

    static allMetastoreInfo(
        response: QueryAllMetaInfoResponse
    ): QueryAllMetaInfoResponse.AsObject {

        const pagination = response.getPagination()

        return {
            metainfoList: response.getMetainfoList().map(ChainGrpcMetastoreTransformer.metaInfoObject),
            pagination: pagination != null ? ChainGrpcMetastoreTransformer.paginationObject(pagination) : undefined,
        }
    }

    static metastoreInfo(
        response: QueryGetMetaInfoResponse
    ): QueryGetMetaInfoResponse.AsObject {

        const metaInfo = response.getMetainfo()

        return {
            metainfo: metaInfo != null ? ChainGrpcMetastoreTransformer.metaInfoObject(metaInfo) : undefined,
        }
    }

    private static metaInfoObject(
        metaInfo: MetaInfo
    ) : MetaInfo.AsObject {
        return {
            chainid: metaInfo.getChainid(),
            dappaddress: metaInfo.getDappaddress(),
            feepayer: metaInfo.getFeepayer(),
            feepayerapproved: metaInfo.getFeepayerapproved(),
        }
    }

    private static paginationObject(
        pageResponse: PageResponse
    ) : PageResponse.AsObject  {
        return {
            nextKey: pageResponse.getNextKey(),
            total: pageResponse.getTotal()
        }
    }

}
