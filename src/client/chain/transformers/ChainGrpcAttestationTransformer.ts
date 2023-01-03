import {
    QueryLatestValsetNonceResponse,
    QueryAllValsetResponse,
    QueryGetValsetResponse,
    QueryLatestValsetResponse,
    QueryLastEventNonceResponse,
    QueryListOrchestratorsResponse
  } from '@routerprotocol/chain-api/attestation/query_pb';
import { Valset } from '@routerprotocol/chain-api/attestation/valset_pb';
import { BridgeValidator } from '@routerprotocol/chain-api/attestation/bridge_validator_pb'
import { MsgSetOrchestratorAddress as Orchestrator } from '@routerprotocol/chain-api/attestation/tx_pb';
import { PageResponse } from '@routerprotocol/chain-api/cosmos/base/query/v1beta1/pagination_pb';
import { grpcPaginationToPagination } from '../../../utils/pagination';

export class ChainGrpcAttestationTransformer {

    static latestValsetNonce(
        response: QueryLatestValsetNonceResponse
    ): QueryLatestValsetNonceResponse.AsObject
    {
        return {
            valsetnonce: response.getValsetnonce()
        };
    }

    static allValset(
        response: QueryAllValsetResponse
    ) : QueryAllValsetResponse.AsObject
    {
        const valsetList: Valset[] = response.getValsetList();
        const valsetObjectList: Valset.AsObject[] = valsetList.map(ChainGrpcAttestationTransformer.getValsetObject);
        const page: PageResponse | undefined = response.getPagination();
        return {
            valsetList: valsetObjectList,
            pagination: grpcPaginationToPagination(page)
        }
    }

    static valsetByNonce(
        response: QueryGetValsetResponse
    ) : {
        valset: Valset.AsObject | undefined
    } {
        const valset = response.getValset();
        
        if (valset == undefined) {
            return {
                valset: undefined
            }
        }
        return {
            valset: ChainGrpcAttestationTransformer.getValsetObject(valset) 
        };
    }

    static latestValset(
        response: QueryLatestValsetResponse
    ) : {
        valset: Valset.AsObject | undefined
    } {
       const valset = response.getValset();
        
        if (valset == undefined) {
            return {
                valset: undefined
            }
        }
        return {
            valset: ChainGrpcAttestationTransformer.getValsetObject(valset) 
        };
    }

    static lastEventByValidator(
        response: QueryLastEventNonceResponse
    ) : {
        eventNonce: number
    } {
        return {
            eventNonce: response.getEventnonce()
        };
    }

    static listOrchestrators(
        response: QueryListOrchestratorsResponse
    ) : {
        orchestrator_set: Orchestrator.AsObject[]
    } {
        let orchestratorSet: Orchestrator[] = response.getOrchestratorSetList();

        return {
            orchestrator_set: orchestratorSet.map(ChainGrpcAttestationTransformer.getOrchestratorObject)
        };
    }

    private static getOrchestratorObject(
        orchestrator: Orchestrator
    ) : Orchestrator.AsObject   
    {
        return {
            validator: orchestrator.getValidator(),
            orchestrator: orchestrator.getOrchestrator(),
            ethaddress: orchestrator.getOrchestrator()
        }
    }

    private static getValsetObject(
        valset: Valset
    ) : Valset.AsObject {
        const members = valset.getMembersList();
        
        const memberObjects: BridgeValidator.AsObject[] = members.map(ChainGrpcAttestationTransformer.getMemberObject);
        
        return {
            nonce: valset.getNonce(),
            membersList: memberObjects,
            height: valset.getHeight(),
        }
    }

    private static getMemberObject(
        member: BridgeValidator
    ) : BridgeValidator.AsObject{
        return {
            power: member.getPower(),
            ethereumaddress: member.getEthereumaddress()
        }
    }
}
