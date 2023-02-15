import { sha256 } from "@cosmjs/crypto";
import { CrossTalkRequest } from "@routerprotocol/chain-api/crosstalk/cross_talk_request_pb";

import { CrossTalkRequestClaimHash } from "@routerprotocol/chain-api/crosstalk/cross_talk_request_pb";


/**
 * Calculates claim hash by doing sha256 of CrossTalkRequest data members.
 * 
 * @group Util
 * 
 * @param crossTalkRequest 
 * @returns claim hash
 */
export function getCrossTalkClaimHash(crossTalkRequest: CrossTalkRequest) : Uint8Array {
    
    const claimHash = new CrossTalkRequestClaimHash();

    claimHash.setEventnonce(crossTalkRequest.getEventnonce()) 
    claimHash.setBlockheight(crossTalkRequest.getBlockheight())  
    claimHash.setSourcechaintype(crossTalkRequest.getSourcechaintype())
    claimHash.setSourcechainid(crossTalkRequest.getSourcechainid() )
    claimHash.setSourcetxhash(crossTalkRequest.getSourcetxhash())
    claimHash.setDestinationchaintype(crossTalkRequest.getDestinationchaintype())
    claimHash.setDestinationchainid(crossTalkRequest.getDestinationchainid())
    claimHash.setDestinationgaslimit(crossTalkRequest.getDestinationgaslimit())  
    claimHash.setDestinationgasprice(crossTalkRequest.getDestinationgasprice())  
    claimHash.setRequestsender(crossTalkRequest.getRequestsender())
    claimHash.setRequesttxorigin(crossTalkRequest.getRequesttxorigin())
    claimHash.setIsreadcall(crossTalkRequest.getIsreadcall())
    claimHash.setRequestnonce(crossTalkRequest.getRequestnonce())
    claimHash.setIsatomic(crossTalkRequest.getIsatomic())
    claimHash.setExpirytimestamp(crossTalkRequest.getExpirytimestamp())
    claimHash.setDestcontractaddressesList(crossTalkRequest.getDestcontractaddressesList())  
    claimHash.setDestcontractpayloadsList(crossTalkRequest.getDestcontractpayloadsList())
    claimHash.setAcktype(crossTalkRequest.getAcktype()) 
    claimHash.setAckgaslimit(crossTalkRequest.getAckgaslimit())
    claimHash.setAckgasprice(crossTalkRequest.getAckgasprice())
    claimHash.setFeepayer(crossTalkRequest.getFeepayer())

    claimHash.toObject()

    const marshalledClaimHash = JSON.stringify(claimHash)

    const marshalledClaimHash_asU8 = marshalledClaimHash.split("").map(e => e.charCodeAt(0));
    return sha256(new Uint8Array(marshalledClaimHash_asU8));
}

