import {
    QueryGetIncomingTxResponse
  } from '@routerprotocol/chain-api/inbound/query_pb';
import { IncomingTx } from '@routerprotocol/chain-api/inbound/incoming_tx_pb';

/**
 * @category Chain Grpc Transformer
 */
export class ChainGrpcInboundTransformer {

    static incomingTx(
        response: QueryGetIncomingTxResponse
    ): QueryGetIncomingTxResponse.AsObject
    {
        const incomingTx = response.getIncomingtx();

        if (incomingTx == undefined) {
            return {
                incomingtx: undefined
            }
        }
        return {
            incomingtx: ChainGrpcInboundTransformer.incomingTxObject(incomingTx)
        }
    }

    private static incomingTxObject(
        incomingTx: IncomingTx
    ) : IncomingTx.AsObject {
        return {
            chaintype: incomingTx.getChaintype(),
            chainid: incomingTx.getChainid(),
            eventnonce: incomingTx.getEventnonce(),
            blockheight: incomingTx.getBlockheight(),
            sourcetxhash: incomingTx.getSourcetxhash(),
            sourcesender: incomingTx.getSourcesender(),
            routerbridgecontract: incomingTx.getRouterbridgecontract(),
            payload: incomingTx.getPayload(),
            status: incomingTx.getStatus()
        }
    }
}
