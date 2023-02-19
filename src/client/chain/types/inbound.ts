import { InboundRequestClaimHash } from "@routerprotocol/chain-api/inbound/incoming_tx_pb";
import { getClaimHash } from "./util";

export function getMsgInboundRequestClaimHash(claimHashObject: InboundRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new InboundRequestClaimHash();

    claimHash.setChaintype(claimHashObject.chaintype)
    claimHash.setChainid(claimHashObject.chainid)
    claimHash.setEventnonce(claimHashObject.eventnonce)
    claimHash.setBlockheight(claimHashObject.blockheight)
    claimHash.setSourcetxhash(claimHashObject.sourcetxhash)
    claimHash.setSourcesender(claimHashObject.sourcesender)
    claimHash.setRouterbridgecontract(claimHashObject.routerbridgecontract)
    claimHash.setPayload(claimHashObject.payload)
    claimHash.setGaslimit(claimHashObject.gaslimit)

    return getClaimHash(claimHash.serializeBinary())
}

export function getIncomingTxClaimHash(claimHashObject: InboundRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new InboundRequestClaimHash();

    claimHash.setChaintype(claimHashObject.chaintype)
    claimHash.setChainid(claimHashObject.chainid)
    claimHash.setEventnonce(claimHashObject.eventnonce)
    claimHash.setBlockheight(claimHashObject.blockheight)
    claimHash.setSourcetxhash(claimHashObject.sourcetxhash)
    claimHash.setSourcesender(claimHashObject.sourcesender)
    claimHash.setRouterbridgecontract(claimHashObject.routerbridgecontract)
    claimHash.setPayload(claimHashObject.payload)
    claimHash.setGaslimit(claimHashObject.gaslimit)

    return getClaimHash(claimHash.serializeBinary())
}