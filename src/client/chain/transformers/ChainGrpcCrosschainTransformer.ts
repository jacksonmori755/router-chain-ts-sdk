import { PageResponse } from '@routerprotocol/chain-api/cosmos/base/query/v1beta1/pagination_pb';
import {
    QueryAllCrosschainRequestResponse,
    QueryAllCrosschainRequestConfirmResponse,
    QueryAllCrosschainAckRequestResponse,
    QueryAllCrosschainAckRequestConfirmResponse,
    QueryGetCrosschainRequestConfirmResponse,
    QueryGetCrosschainAckRequestConfirmResponse,
} from '@routerprotocol/chain-api/routerchain/crosschain/query_pb';
import { CrosschainRequestConfirm } from '@routerprotocol/chain-api/routerchain/crosschain/crosschain_request_confirm_pb';
import { CrosschainAckRequest } from '@routerprotocol/chain-api/routerchain/crosschain/crosschain_ack_request_pb';
import { CrosschainAckRequestConfirm } from '@routerprotocol/chain-api/routerchain/crosschain/crosschain_ack_request_confirm_pb';
import { Coin } from '@routerprotocol/chain-api/cosmos/base/v1beta1/coin_pb';
import { CrosschainRequest } from '@routerprotocol/chain-api/routerchain/crosschain/crosschain_request_pb';
export class ChainGrpcCrosschainTransformer {

    static crosschainRequests(
        response: QueryAllCrosschainRequestResponse
    ): QueryAllCrosschainRequestResponse.AsObject {
        
        const pagination = response.getPagination()

        return {
            crosschainrequestList: response.getCrosschainrequestList().map(ChainGrpcCrosschainTransformer.crosschainRequestObj),
            pagination: pagination != null ? ChainGrpcCrosschainTransformer.paginationObject(pagination) : undefined,
        }
    }

    static crosschainRequestConfirmations(
        response: QueryAllCrosschainRequestConfirmResponse
    ): QueryAllCrosschainRequestConfirmResponse.AsObject {
        
        const pagination = response.getPagination()

        return {
            crosschainrequestconfirmList: response.getCrosschainrequestconfirmList().map(ChainGrpcCrosschainTransformer.crosschainRequestConfirmObj),
            pagination: pagination != null ? ChainGrpcCrosschainTransformer.paginationObject(pagination) : undefined,
        }
    }

    static crosschainAckRequests(
        response: QueryAllCrosschainAckRequestResponse
    ): QueryAllCrosschainAckRequestResponse.AsObject {
        
        const pagination = response.getPagination()

        return {
            crosschainackrequestList: response.getCrosschainackrequestList().map(ChainGrpcCrosschainTransformer.crosschainAckRequestObj),
            pagination: pagination != null ? ChainGrpcCrosschainTransformer.paginationObject(pagination) : undefined,
        }
    }

    static crosschainAckRequestConfirmations(
        response: QueryAllCrosschainAckRequestConfirmResponse
    ): QueryAllCrosschainAckRequestConfirmResponse.AsObject {
        
        const pagination = response.getPagination()

        return {
            crosschainackrequestconfirmList: response.getCrosschainackrequestconfirmList().map(ChainGrpcCrosschainTransformer.crosschainAckRequestConfirmObj),
            pagination: pagination != null ? ChainGrpcCrosschainTransformer.paginationObject(pagination) : undefined,
        }
    }

    static crosschainRequestConfirmation(
        request: QueryGetCrosschainRequestConfirmResponse
    ): QueryGetCrosschainRequestConfirmResponse.AsObject {

        const crosschainrequestconfirm = request.getCrosschainrequestconfirm()

        return {
            crosschainrequestconfirm: crosschainrequestconfirm != null ? ChainGrpcCrosschainTransformer.crosschainRequestConfirmObj(crosschainrequestconfirm) : undefined
        }
    }

    static crosschainAckRequestConfirmation(
        request: QueryGetCrosschainAckRequestConfirmResponse
    ): QueryGetCrosschainAckRequestConfirmResponse.AsObject {

        const crosschainAckRequestConfirm = request.getCrosschainackrequestconfirm()

        return {
            crosschainackrequestconfirm: crosschainAckRequestConfirm != null ? {
                orchestrator: crosschainAckRequestConfirm.getOrchestrator(),
                acksrcchainid: crosschainAckRequestConfirm.getAcksrcchainid(),
                ackrequestidentifier: crosschainAckRequestConfirm.getAckrequestidentifier(),
                claimhash: crosschainAckRequestConfirm.getClaimhash(),
                ethsigner: crosschainAckRequestConfirm.getEthsigner(),
                signature: crosschainAckRequestConfirm.getSignature(),
            } : undefined
        }
    }

    private static crosschainRequestObj(
        request: CrosschainRequest
    ): CrosschainRequest.AsObject {

        return {
            srcChainId: request.getSrcChainId(),
            requestIdentifier: request.getRequestIdentifier(),
            blockHeight: request.getBlockHeight(),
            sourceTxHash: request.getSourceTxHash(),
            srcTimestamp: request.getSrcTimestamp(),
            srcTxOrigin: request.getSrcTxOrigin(),
            routeAmount: request.getRouteAmount(),
            routeRecipient: request.getRouteRecipient(),
            destChainId: request.getDestChainId(),
            destGasLimit: request.getDestGasLimit(),
            destGasPrice: request.getDestGasPrice(),
            relayerIncentive: ChainGrpcCrosschainTransformer.coinObject(request.getRelayerIncentive()),
            requestSender: request.getRequestSender(),
            requestMetadata: request.getRequestMetadata(),
            requestPacket: request.getRequestPacket(),
            srcChainType: request.getSrcChainType(),
            destChainType: request.getDestChainType(),
            destTxFeeDeducted: ChainGrpcCrosschainTransformer.coinObject(request.getDestTxFeeDeducted()),
            status: request.getStatus(),
        }
    }

    private static crosschainRequestConfirmObj(
        request: CrosschainRequestConfirm
    ): CrosschainRequestConfirm.AsObject {
        return {
            orchestrator: request.getOrchestrator(),
            sourcechainid: request.getSourcechainid(),
            requestidentifier: request.getRequestidentifier(),
            claimhash: request.getClaimhash(),
            ethsigner: request.getEthsigner(),
            signature: request.getSignature(),
        }
    }

    private static crosschainAckRequestObj(
        request: CrosschainAckRequest
    ): CrosschainAckRequest.AsObject {

        return {
            ackSrcChainId: request.getAckSrcChainId(),
            ackRequestIdentifier: request.getAckRequestIdentifier(),
            blockheight: request.getBlockheight(),
            desttxhash: request.getDesttxhash(),
            relayerrouteraddress: request.getRelayerrouteraddress(),
            ackDestChainId: request.getAckDestChainId(),
            requestSender: request.getRequestSender(),
            requestidentifier: request.getRequestidentifier(),
            ackSrcChainType: request.getAckSrcChainType(),
            ackDestChainType: request.getAckDestChainType(),
            feeconsumed: request.getFeeconsumed(),
            execdata: request.getExecdata(),
            execstatus: request.getExecstatus(),
            ethsigner: request.getEthsigner(),
            signature: request.getSignature(),
            ackGasLimit: request.getAckGasLimit(),
            ackGasPrice: request.getAckGasPrice(),
            ackFeeDeducted: ChainGrpcCrosschainTransformer.coinObject(request.getAckFeeDeducted()),
            ackRelayerIncentive: ChainGrpcCrosschainTransformer.coinObject(request.getAckRelayerIncentive()),
            status: request.getStatus(),
        };
    }

    private static crosschainAckRequestConfirmObj(
        request: CrosschainAckRequestConfirm
    ): CrosschainAckRequestConfirm.AsObject {

        return {
            orchestrator: request.getOrchestrator(),
            acksrcchainid: request.getAcksrcchainid(),
            ackrequestidentifier: request.getAckrequestidentifier(),
            claimhash: request.getClaimhash(),
            ethsigner: request.getEthsigner(),
            signature: request.getSignature(),
        }
    }

    private static paginationObject(
        pageResponse: PageResponse
    ): PageResponse.AsObject {
        return {
            nextKey: pageResponse.getNextKey(),
            total: pageResponse.getTotal()
        }
    }

    private static coinObject(coin: Coin | undefined): Coin.AsObject | undefined {
        if (coin == null) {
            return undefined
        }

        return {
            denom: coin.getDenom(),
            amount: coin.getAmount()
        }
    }

}
