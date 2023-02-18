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
    claimHash.setSourcesender(msgInboundRequest.sourcesender)
    claimHash.setRouterbridgecontract(msgInboundRequest.routerbridgecontract)
    claimHash.setPayload(msgInboundRequest.payload)
    claimHash.setGaslimit(msgInboundRequest.gaslimit)

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
    claimHash.setSourcesender(incomingTx.sourcesender)
    claimHash.setRouterbridgecontract(incomingTx.routerbridgecontract)
    claimHash.setPayload(incomingTx.payload)
    claimHash.setGaslimit(incomingTx.gaslimit)

    return getClaimHash(claimHash.serializeBinary())
}