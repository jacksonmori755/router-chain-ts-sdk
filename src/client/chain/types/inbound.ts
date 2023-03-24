import { InboundRequestClaimHash } from "@routerprotocol/chain-api/inbound/incoming_tx_pb";
import { getClaimHash } from "./util";

/**
 * Get MsgInboundRequest ClaimHash
 * @param msgInboundRequest 
 * @returns 
 */
export function getMsgInboundRequestClaimHash(msgInboundRequest: InboundRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new InboundRequestClaimHash();

    claimHash.setChaintype(msgInboundRequest.chaintype)
    claimHash.setChainid(msgInboundRequest.chainid)
    claimHash.setEventnonce(msgInboundRequest.eventnonce)
    claimHash.setBlockheight(msgInboundRequest.blockheight)
    claimHash.setSourcetxhash(msgInboundRequest.sourcetxhash)
    claimHash.setSourcetimestamp(msgInboundRequest.sourcetimestamp)
    claimHash.setSourcesender(msgInboundRequest.sourcesender)
    claimHash.setRouterbridgecontract(msgInboundRequest.routerbridgecontract)
    claimHash.setPayload(msgInboundRequest.payload)
    claimHash.setGaslimit(msgInboundRequest.gaslimit)
    claimHash.setRouteamount(msgInboundRequest.routeamount)
    claimHash.setRouterecipient(msgInboundRequest.routerecipient)
    claimHash.setAsmaddress(msgInboundRequest.asmaddress)

    return getClaimHash(claimHash.serializeBinary())
}

/**
 * Get IncomingTx ClaimHash
 * @param incomingTx 
 * @returns 
 */
export function getIncomingTxClaimHash(incomingTx: InboundRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new InboundRequestClaimHash();

    claimHash.setChaintype(incomingTx.chaintype)
    claimHash.setChainid(incomingTx.chainid)
    claimHash.setEventnonce(incomingTx.eventnonce)
    claimHash.setBlockheight(incomingTx.blockheight)
    claimHash.setSourcetxhash(incomingTx.sourcetxhash)
    claimHash.setSourcetimestamp(incomingTx.sourcetimestamp)
    claimHash.setSourcesender(incomingTx.sourcesender)
    claimHash.setRouterbridgecontract(incomingTx.routerbridgecontract)
    claimHash.setPayload(incomingTx.payload)
    claimHash.setGaslimit(incomingTx.gaslimit)
    claimHash.setRouteamount(incomingTx.routeamount)
    claimHash.setRouterecipient(incomingTx.routerecipient)
    claimHash.setAsmaddress(incomingTx.asmaddress)

    return getClaimHash(claimHash.serializeBinary())
}