import { OutboundAckClaimHash } from "@routerprotocol/chain-api/outbound/outbound_ack_pb";
import { getClaimHash } from "./util";

export function getMsgOutboundAckClaimHash(claimHashObject: OutboundAckClaimHash.AsObject) : Uint8Array {
    const claimHash = new OutboundAckClaimHash();

    claimHash.setChaintype(claimHashObject.chaintype)
    claimHash.setChainid(claimHashObject.chainid)
    claimHash.setEventnonce(claimHashObject.eventnonce)
    claimHash.setBlockheight(claimHashObject.blockheight)
    claimHash.setOutboundtxnonce(claimHashObject.outboundtxnonce)
    claimHash.setOutboundtxrequestedby(claimHashObject.outboundtxrequestedby)
    claimHash.setRelayerrouteraddress(claimHashObject.relayerrouteraddress)
    claimHash.setDestinationtxhash(claimHashObject.destinationtxhash)
    claimHash.setContractackresponses(claimHashObject.contractackresponses)
    claimHash.setExecode(claimHashObject.execode)
    claimHash.setExecstatus(claimHashObject.execstatus)
    claimHash.setExecflagsList(claimHashObject.execflagsList)
    claimHash.setExecdataList(claimHashObject.execdataList)

    return getClaimHash(claimHash.serializeBinary())
}
