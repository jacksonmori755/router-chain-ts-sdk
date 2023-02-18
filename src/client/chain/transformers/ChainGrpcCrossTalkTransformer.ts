import {
    QueryAllCrossTalkRequestResponse,
    QueryAllCrosstalkRequestConfirmResponse,
    QueryAllCrossTalkAckRequestResponse,
    QueryAllCrosstalkAckRequestConfirmResponse,
    QueryGetCrossTalkRequestResponse,
    QueryGetCrossTalkAckRequestResponse
} from '@routerprotocol/chain-api/crosstalk/query_pb';

import { CrossTalkRequest } from "@routerprotocol/chain-api/crosstalk/cross_talk_request_pb";
import { CrosstalkRequestConfirm } from '@routerprotocol/chain-api/crosstalk/crosstalk_request_confirm_pb';
import { CrossTalkAckRequest } from '@routerprotocol/chain-api/crosstalk/cross_talk_ack_request_pb';
import { CrosstalkAckRequestConfirm } from '@routerprotocol/chain-api/crosstalk/crosstalk_ack_request_confirm_pb';
import { grpcPaginationToPagination } from '../../../utils/pagination';

export class ChainGrpcCrossTalkTransformer {

    static crossTalkRequest(
        response: QueryGetCrossTalkRequestResponse
    ): QueryGetCrossTalkRequestResponse.AsObject {

        const crosstalkrequest: CrossTalkRequest | undefined = response.getCrosstalkrequest();

        return {
            crosstalkrequest: crosstalkrequest ? ChainGrpcCrossTalkTransformer.getCrossTalkRequestObject(crosstalkrequest) : undefined
        }
    }

    static allCrossTalkRequest(
        response: QueryAllCrossTalkRequestResponse
    ): QueryAllCrossTalkRequestResponse.AsObject {

        const crosstalkrequestList: CrossTalkRequest[] = response.getCrosstalkrequestList();
        return {
            crosstalkrequestList: crosstalkrequestList.map(ChainGrpcCrossTalkTransformer.getCrossTalkRequestObject),
            pagination: grpcPaginationToPagination(response.getPagination())
        }
    }

    static allCrosstalkRequestConfirmations(
        response: QueryAllCrosstalkRequestConfirmResponse
    ): QueryAllCrosstalkRequestConfirmResponse.AsObject {

        const crosstalkrequestconfirmList: CrosstalkRequestConfirm[] = response.getCrosstalkrequestconfirmList();

        return {
            crosstalkrequestconfirmList: crosstalkrequestconfirmList.map(ChainGrpcCrossTalkTransformer.getCrossTalkRequestConfirmObject),
            pagination: grpcPaginationToPagination(response.getPagination())
        }
    }

    static allCrossTalkAckRequest(response: QueryAllCrossTalkAckRequestResponse): QueryAllCrossTalkAckRequestResponse.AsObject {
        const crosstalkackrequestList: CrossTalkAckRequest[] = response.getCrosstalkackrequestList();

        return {
            crosstalkackrequestList: crosstalkackrequestList.map(ChainGrpcCrossTalkTransformer.getCrossTalkAckRequestObject),
            pagination: grpcPaginationToPagination(response.getPagination())
        }
    }

    static crossTalkAckRequest(response: QueryGetCrossTalkAckRequestResponse): QueryGetCrossTalkAckRequestResponse.AsObject {
        const crosstalkackrequest: CrossTalkAckRequest | undefined = response.getCrosstalkackrequest();

        return {
            crosstalkackrequest: crosstalkackrequest? ChainGrpcCrossTalkTransformer.getCrossTalkAckRequestObject(crosstalkackrequest) : undefined
        }
    }

    static allCrosstalkAckRequestConfirmations(response: QueryAllCrosstalkAckRequestConfirmResponse): QueryAllCrosstalkAckRequestConfirmResponse.AsObject {
        const crosstalkackrequestconfirmList: CrosstalkAckRequestConfirm[] = response.getCrosstalkackrequestconfirmList();

        return {
            crosstalkackrequestconfirmList: crosstalkackrequestconfirmList.map(ChainGrpcCrossTalkTransformer.getCrosstalkAckRequestConfirmations),
            pagination: grpcPaginationToPagination(response.getPagination())
        }
    }

    private static getCrossTalkRequestObject(
        crossTalkRequest: CrossTalkRequest
    ): CrossTalkRequest.AsObject {
        return {
            eventnonce: crossTalkRequest.getEventnonce(),
            blockheight: crossTalkRequest.getBlockheight(),
            sourcechaintype: crossTalkRequest.getSourcechaintype(),
            sourcechainid: crossTalkRequest.getSourcechainid(),
            sourcetxhash: crossTalkRequest.getSourcetxhash(),
            destinationchaintype: crossTalkRequest.getDestinationchaintype(),
            destinationchainid: crossTalkRequest.getDestinationchainid(),
            destinationgaslimit: crossTalkRequest.getDestinationgaslimit(),
            destinationgasprice: crossTalkRequest.getDestinationgasprice(),
            destinationtxfeeinroute: crossTalkRequest.getDestinationtxfeeinroute()? crossTalkRequest.getDestinationtxfeeinroute()?.toObject(): undefined,
            requestsender: crossTalkRequest.getRequestsender(),
            requesttxorigin: crossTalkRequest.getRequesttxorigin(),
            isreadcall: crossTalkRequest.getIsreadcall(),
            requestnonce: crossTalkRequest.getRequestnonce(),
            isatomic: crossTalkRequest.getIsatomic(),
            expirytimestamp: crossTalkRequest.getExpirytimestamp(),
            destcontractaddressesList: crossTalkRequest.getDestcontractaddressesList(),
            destcontractpayloadsList: crossTalkRequest.getDestcontractaddressesList(),
            acktype: crossTalkRequest.getAcktype(),
            ackgaslimit: crossTalkRequest.getAckgaslimit(),
            ackgasprice: crossTalkRequest.getAckgasprice(),
            feepayer: crossTalkRequest.getFeepayer(),
            status: crossTalkRequest.getStatus(),
        }

    }

    private static getCrossTalkRequestConfirmObject(
        crossTalkRequestConfirm: CrosstalkRequestConfirm
    ): CrosstalkRequestConfirm.AsObject {
        return {
            sourcechaintype: crossTalkRequestConfirm.getSourcechaintype(),
            sourcechainid: crossTalkRequestConfirm.getSourcechainid(),
            eventnonce: crossTalkRequestConfirm.getEventnonce(),
            claimhash: crossTalkRequestConfirm.getClaimhash(),
            ethsigner: crossTalkRequestConfirm.getEthsigner(),
            signature: crossTalkRequestConfirm.getSignature(),
            orchestrator: crossTalkRequestConfirm.getOrchestrator(),
        }

    }

    private static getCrossTalkAckRequestObject(
        crossTalkAckRequest: CrossTalkAckRequest
    ): CrossTalkAckRequest.AsObject {
        return {
            eventnonce: crossTalkAckRequest.getEventnonce(),
            blockheight: crossTalkAckRequest.getBlockheight(),
            relayerrouteraddress: crossTalkAckRequest.getRelayerrouteraddress(),
            sourcechaintype: crossTalkAckRequest.getSourcechaintype(),
            sourcechainid: crossTalkAckRequest.getSourcechainid(),
            chaintype: crossTalkAckRequest.getChaintype(),
            chainid: crossTalkAckRequest.getChainid(),
            destinationtxhash: crossTalkAckRequest.getDestinationtxhash(),
            eventidentifier: crossTalkAckRequest.getEventidentifier(),
            crosstalkrequestsender: crossTalkAckRequest.getCrosstalkrequestsender(),
            crosstalknonce: crossTalkAckRequest.getCrosstalknonce(),
            contractackresponses: crossTalkAckRequest.getContractackresponses(),
            execode: crossTalkAckRequest.getExecode(),
            execstatus: crossTalkAckRequest.getExecstatus(),
            execflagsList: crossTalkAckRequest.getExecflagsList(),
            execdataList: crossTalkAckRequest.getExecdataList(),
            feeconsumedinroute: crossTalkAckRequest.getFeeconsumedinroute() ? crossTalkAckRequest.getFeeconsumedinroute()?.toObject() : undefined,
            feedeductedinrouteforack: crossTalkAckRequest.getFeedeductedinrouteforack() ? crossTalkAckRequest.getFeedeductedinrouteforack()?.toObject() : undefined,
            status: crossTalkAckRequest.getStatus(),
        }

    }

    private static getCrosstalkAckRequestConfirmations(
        crosstalkAckRequestConfirm: CrosstalkAckRequestConfirm
    ): CrosstalkAckRequestConfirm.AsObject {
        return {
            chaintype: crosstalkAckRequestConfirm.getChaintype(),
            chainid: crosstalkAckRequestConfirm.getChainid(),
            eventnonce: crosstalkAckRequestConfirm.getEventnonce(),
            claimhash: crosstalkAckRequestConfirm.getClaimhash(),
            ethsigner: crosstalkAckRequestConfirm.getEthsigner(),
            signature: crosstalkAckRequestConfirm.getSignature(),
            orchestrator: crosstalkAckRequestConfirm.getOrchestrator()
        }

    }
}
