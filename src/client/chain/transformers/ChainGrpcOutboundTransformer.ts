import {
    QueryAllOutgoingBatchTxResponse,
    QueryGetOutgoingBatchTxResponse,
    QueryGetOutgoingBatchConfirmResponse,
    QueryAllOutgoingBatchConfirmResponse,
    QueryLastOutboundBatchNonceResponse
} from '@routerprotocol/chain-api/outbound/query_pb';
import { OutgoingBatchTx } from '@routerprotocol/chain-api/outbound/outgoing_batch_tx_pb';
import { OutgoingBatchConfirm } from '@routerprotocol/chain-api/outbound/outgoing_batch_confirm_pb';
import { ContractCall } from '@routerprotocol/chain-api/outbound/contract_call_pb';
import { grpcPaginationToPagination } from '../../../utils/pagination';

export class ChainGrpcOutboundTransformer {

    static allOutgoingBatchTx(
        response: QueryAllOutgoingBatchTxResponse
    ): QueryAllOutgoingBatchTxResponse.AsObject {
        const outgoingTxs: OutgoingBatchTx[] = response.getOutgoingbatchtxList();
        const page = response.getPagination();

        return {
            outgoingbatchtxList: outgoingTxs.map(ChainGrpcOutboundTransformer.getOutgoingBatchTxObject),
            pagination: grpcPaginationToPagination(page)
        }
    }

    static outgoingBatchTx(
        response: QueryGetOutgoingBatchTxResponse
    ): QueryGetOutgoingBatchTxResponse.AsObject {
        const outgoingTx = response.getOutgoingbatchtx();
        if (outgoingTx == undefined) {
            return {
                outgoingbatchtx: undefined
            }
        }

        return {
            outgoingbatchtx: ChainGrpcOutboundTransformer.getOutgoingBatchTxObject(outgoingTx),
        }
    }

    static outgoingBatchTxConfirm(
        response: QueryGetOutgoingBatchConfirmResponse
    ): QueryGetOutgoingBatchConfirmResponse.AsObject {
        const outgoingBatchTxConfirm = response.getOutgoingbatchconfirm();
        if (outgoingBatchTxConfirm == undefined) {
            return {
                outgoingbatchconfirm: undefined
            }
        }

        return {
            outgoingbatchconfirm: ChainGrpcOutboundTransformer.getOutgoingBatchTxConfirmObject(outgoingBatchTxConfirm)
        }
    }

    static allOutgoingBatchTxConfirms(
        response: QueryAllOutgoingBatchConfirmResponse
    ): QueryAllOutgoingBatchConfirmResponse.AsObject {
        const outgoingBatchConfirmList = response.getOutgoingbatchconfirmList();
        const page = response.getPagination();

        return {
            outgoingbatchconfirmList: outgoingBatchConfirmList.map(ChainGrpcOutboundTransformer.getOutgoingBatchTxConfirmObject),
            pagination: grpcPaginationToPagination(page)
        }
    }

    static lastOutboundBatchNonce(
        response: QueryLastOutboundBatchNonceResponse
    ): QueryLastOutboundBatchNonceResponse.AsObject {
        return {
            outboundbatchnonce: response.getOutboundbatchnonce()
        }
    }

    private static getOutgoingBatchTxConfirmObject(
        outgoingBatchTxConfirm: OutgoingBatchConfirm
    ): OutgoingBatchConfirm.AsObject {

        return {
            destinationchaintype: outgoingBatchTxConfirm.getDestinationchaintype(),
            destinationchainid: outgoingBatchTxConfirm.getDestinationchainid(),
            outgoingbatchsender: outgoingBatchTxConfirm.getOutgoingbatchsender(),
            outgoingbatchnonce: outgoingBatchTxConfirm.getOutgoingbatchnonce(),
            ethsigner: outgoingBatchTxConfirm.getEthsigner(),
            signature: outgoingBatchTxConfirm.getSignature(),
            orchestrator: outgoingBatchTxConfirm.getOrchestrator(),
        }
    }

    private static getOutgoingBatchTxObject(
        outgoingBatchTx: OutgoingBatchTx
    ): OutgoingBatchTx.AsObject {

        return {
            nonce: outgoingBatchTx.getNonce(),
            destinationchaintype: outgoingBatchTx.getDestinationchaintype(),
            destinationchainid: outgoingBatchTx.getDestinationchainid(),
            contractcallsList: outgoingBatchTx.getContractcallsList().map(ChainGrpcOutboundTransformer.getContractCallObject),
            relayerfee: outgoingBatchTx.getRelayerfee() ? outgoingBatchTx.getRelayerfee()?.toObject() : undefined,
            destinationgaslimit: outgoingBatchTx.getDestinationgaslimit(),
            destinationgasprice: outgoingBatchTx.getDestinationgasprice(),
            outgoingtxfeeinroute: outgoingBatchTx.getOutgoingtxfeeinroute() ? outgoingBatchTx.getOutgoingtxfeeinroute()?.toObject() : undefined,
            expirytimestamp: outgoingBatchTx.getExpirytimestamp(),
            isatomic: outgoingBatchTx.getIsatomic(),
            sourceaddress: outgoingBatchTx.getSourceaddress(),
            status: outgoingBatchTx.getStatus()
        }
    }

    private static getContractCallObject(
        contractCall: ContractCall
    ): ContractCall.AsObject {
        return {
            destinationcontractaddress: contractCall.getDestinationcontractaddress(),
            payload: contractCall.getPayload(),
        }
    }
}
