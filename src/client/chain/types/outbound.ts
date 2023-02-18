import { OutboundAckClaimHash } from "@routerprotocol/chain-api/outbound/outbound_ack_pb";
import { getClaimHash } from "./util";

/**
 * Get MsgOutboundAck ClaimHash
 * 
 * @param msgOutboundAck 
 * @returns 
 */
export function getMsgOutboundAckClaimHash(msgOutboundAck: OutboundAckClaimHash.AsObject) : Uint8Array {
    const claimHash = new OutboundAckClaimHash();

    claimHash.setChaintype(msgOutboundAck.chaintype)
    claimHash.setChainid(msgOutboundAck.chainid)
    claimHash.setEventnonce(msgOutboundAck.eventnonce)
    claimHash.setBlockheight(msgOutboundAck.blockheight)
    claimHash.setOutboundtxnonce(msgOutboundAck.outboundtxnonce)
    claimHash.setOutboundtxrequestedby(msgOutboundAck.outboundtxrequestedby)
    claimHash.setRelayerrouteraddress(msgOutboundAck.relayerrouteraddress)
    claimHash.setDestinationtxhash(msgOutboundAck.destinationtxhash)
    claimHash.setContractackresponses(msgOutboundAck.contractackresponses)
    claimHash.setExecode(msgOutboundAck.execode)
    claimHash.setExecstatus(msgOutboundAck.execstatus)
    claimHash.setExecflagsList(msgOutboundAck.execflagsList)
    claimHash.setExecdataList(msgOutboundAck.execdataList)

    return getClaimHash(claimHash.serializeBinary())
}
