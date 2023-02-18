import { CrossTalkRequestClaimHash } from "@routerprotocol/chain-api/crosstalk/cross_talk_request_pb";
import { CrossTalkAckRequestClaimHash } from "@routerprotocol/chain-api/crosstalk/cross_talk_ack_request_pb";
import { getClaimHash } from "./util";

/**
 * Get CrossTalkRequest ClaimHash
 * 
 * @param crossTalkRequest
 * @returns 
 */
export function getCrossTalkRequestClaimHash(crossTalkRequest: CrossTalkRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new CrossTalkRequestClaimHash();

    claimHash.setEventnonce(crossTalkRequest.eventnonce)
    claimHash.setBlockheight(crossTalkRequest.blockheight)
    claimHash.setSourcechaintype(crossTalkRequest.sourcechaintype)
    claimHash.setSourcechainid(crossTalkRequest.sourcechainid)
    claimHash.setSourcetxhash(crossTalkRequest.sourcetxhash)
    claimHash.setDestinationchaintype(crossTalkRequest.destinationchaintype)
    claimHash.setDestinationchainid(crossTalkRequest.destinationchainid)
    claimHash.setDestinationgaslimit(crossTalkRequest.destinationgaslimit)
    claimHash.setDestinationgasprice(crossTalkRequest.destinationgasprice)
    claimHash.setRequestsender(crossTalkRequest.requestsender)
    claimHash.setRequesttxorigin(crossTalkRequest.requesttxorigin)
    claimHash.setIsreadcall(crossTalkRequest.isreadcall)
    claimHash.setRequestnonce(crossTalkRequest.requestnonce)
    claimHash.setIsatomic(crossTalkRequest.isatomic)
    claimHash.setExpirytimestamp(crossTalkRequest.expirytimestamp)
    claimHash.setDestcontractaddressesList(crossTalkRequest.destcontractaddressesList)
    claimHash.setDestcontractpayloadsList(crossTalkRequest.destcontractpayloadsList)
    claimHash.setAcktype(crossTalkRequest.acktype)
    claimHash.setAckgaslimit(crossTalkRequest.ackgaslimit)
    claimHash.setAckgasprice(crossTalkRequest.ackgasprice)
    claimHash.setFeepayer(crossTalkRequest.feepayer)

    return getClaimHash(claimHash.serializeBinary())
}

/**
 * Get CrossTalkAckRequest ClaimHash
 * 
 * @param crossTalkAckRequest 
 * @returns 
 */
export function getCrossTalkAckRequestClaimHash(crossTalkAckRequest: CrossTalkAckRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new CrossTalkAckRequestClaimHash();

    claimHash.setEventnonce(crossTalkAckRequest.eventnonce)
    claimHash.setBlockheight(crossTalkAckRequest.blockheight)
    claimHash.setRelayerrouteraddress(crossTalkAckRequest.relayerrouteraddress)
    claimHash.setSourcechaintype(crossTalkAckRequest.sourcechaintype)
    claimHash.setSourcechainid(crossTalkAckRequest.sourcechainid)
    claimHash.setChaintype(crossTalkAckRequest.chaintype)
    claimHash.setChainid(crossTalkAckRequest.chainid)
    claimHash.setDestinationtxhash(crossTalkAckRequest.destinationtxhash)
    claimHash.setEventidentifier(crossTalkAckRequest.eventidentifier)
    claimHash.setCrosstalkrequestsender(crossTalkAckRequest.crosstalkrequestsender)
    claimHash.setCrosstalknonce(crossTalkAckRequest.crosstalknonce)
    claimHash.setContractackresponses(crossTalkAckRequest.contractackresponses)
    claimHash.setExecode(crossTalkAckRequest.execode)
    claimHash.setExecstatus(crossTalkAckRequest.execstatus)
    claimHash.setExecflagsList(crossTalkAckRequest.execflagsList)
    claimHash.setExecdataList(crossTalkAckRequest.execdataList)

    return getClaimHash(claimHash.serializeBinary())
}

/**
 * Get MsgCrossTalkRequest ClaimHash
 * @param msgCrossTalkRequest 
 * @returns 
 */
export function getMsgCrossTalkRequestClaimHash(msgCrossTalkRequest: CrossTalkRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new CrossTalkRequestClaimHash();

    claimHash.setEventnonce(msgCrossTalkRequest.eventnonce)
    claimHash.setBlockheight(msgCrossTalkRequest.blockheight)
    claimHash.setSourcechaintype(msgCrossTalkRequest.sourcechaintype)
    claimHash.setSourcechainid(msgCrossTalkRequest.sourcechainid)
    claimHash.setSourcetxhash(msgCrossTalkRequest.sourcetxhash)
    claimHash.setDestinationchaintype(msgCrossTalkRequest.destinationchaintype)
    claimHash.setDestinationchainid(msgCrossTalkRequest.destinationchainid)
    claimHash.setDestinationgaslimit(msgCrossTalkRequest.destinationgaslimit)
    claimHash.setDestinationgasprice(msgCrossTalkRequest.destinationgasprice)
    claimHash.setRequestsender(msgCrossTalkRequest.requestsender)
    claimHash.setRequesttxorigin(msgCrossTalkRequest.requesttxorigin)
    claimHash.setIsreadcall(msgCrossTalkRequest.isreadcall)
    claimHash.setRequestnonce(msgCrossTalkRequest.requestnonce)
    claimHash.setIsatomic(msgCrossTalkRequest.isatomic)
    claimHash.setExpirytimestamp(msgCrossTalkRequest.expirytimestamp)
    claimHash.setDestcontractaddressesList(msgCrossTalkRequest.destcontractaddressesList)
    claimHash.setDestcontractpayloadsList(msgCrossTalkRequest.destcontractpayloadsList)
    claimHash.setAcktype(msgCrossTalkRequest.acktype)
    claimHash.setAckgaslimit(msgCrossTalkRequest.ackgaslimit)
    claimHash.setAckgasprice(msgCrossTalkRequest.ackgasprice)
    claimHash.setFeepayer(msgCrossTalkRequest.feepayer)

    return getClaimHash(claimHash.serializeBinary())
}

/**
 * Get MsgCrossTalkAckRequest ClaimHash
 * @param msgCrossTalkAckRequest 
 * @returns 
 */
export function getMsgCrossTalkAckRequestClaimHash(msgCrossTalkAckRequest: CrossTalkAckRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new CrossTalkAckRequestClaimHash();

    claimHash.setEventnonce(msgCrossTalkAckRequest.eventnonce)
    claimHash.setBlockheight(msgCrossTalkAckRequest.blockheight)
    claimHash.setRelayerrouteraddress(msgCrossTalkAckRequest.relayerrouteraddress)
    claimHash.setSourcechaintype(msgCrossTalkAckRequest.sourcechaintype)
    claimHash.setSourcechainid(msgCrossTalkAckRequest.sourcechainid)
    claimHash.setChaintype(msgCrossTalkAckRequest.chaintype)
    claimHash.setChainid(msgCrossTalkAckRequest.chainid)
    claimHash.setDestinationtxhash(msgCrossTalkAckRequest.destinationtxhash)
    claimHash.setEventidentifier(msgCrossTalkAckRequest.eventidentifier)
    claimHash.setCrosstalkrequestsender(msgCrossTalkAckRequest.crosstalkrequestsender)
    claimHash.setCrosstalknonce(msgCrossTalkAckRequest.crosstalknonce)
    claimHash.setContractackresponses(msgCrossTalkAckRequest.contractackresponses)
    claimHash.setExecode(msgCrossTalkAckRequest.execode)
    claimHash.setExecstatus(msgCrossTalkAckRequest.execstatus)
    claimHash.setExecflagsList(msgCrossTalkAckRequest.execflagsList)
    claimHash.setExecdataList(msgCrossTalkAckRequest.execdataList)

    return getClaimHash(claimHash.serializeBinary())
}

/**
 * Get MsgCrossTalkAckReceipt ClaimHash
 * 
 * @param crossTalkAckRequest 
 * @returns 
 */
export function getMsgCrossTalkAckReceiptClaimHash(crossTalkAckRequest: CrossTalkAckRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new CrossTalkAckRequestClaimHash();

    claimHash.setEventnonce(crossTalkAckRequest.eventnonce)
    claimHash.setBlockheight(crossTalkAckRequest.blockheight)
    claimHash.setRelayerrouteraddress(crossTalkAckRequest.relayerrouteraddress)
    claimHash.setSourcechaintype(crossTalkAckRequest.sourcechaintype)
    claimHash.setSourcechainid(crossTalkAckRequest.sourcechainid)
    claimHash.setChaintype(crossTalkAckRequest.chaintype)
    claimHash.setChainid(crossTalkAckRequest.chainid)
    claimHash.setDestinationtxhash(crossTalkAckRequest.destinationtxhash)
    claimHash.setEventidentifier(crossTalkAckRequest.eventidentifier)
    claimHash.setCrosstalkrequestsender(crossTalkAckRequest.crosstalkrequestsender)
    claimHash.setCrosstalknonce(crossTalkAckRequest.crosstalknonce)
    claimHash.setContractackresponses(crossTalkAckRequest.contractackresponses)
    claimHash.setExecode(crossTalkAckRequest.execode)
    claimHash.setExecstatus(crossTalkAckRequest.execstatus)
    claimHash.setExecflagsList(crossTalkAckRequest.execflagsList)
    claimHash.setExecdataList(crossTalkAckRequest.execdataList)

    return getClaimHash(claimHash.serializeBinary())
}



