import { InboundRequestClaimHash } from "@routerprotocol/chain-api/inbound/incoming_tx_pb";
import { getClaimHash } from "./util";

export function getMsgInboundRequestClaimHash(claimHashObject: InboundRequestClaimHash.AsObject) : Uint8Array {
    return getClaimHash(claimHashObject)
}

export function getIncomingTxClaimHash(claimHashObject: InboundRequestClaimHash.AsObject) : Uint8Array {
    return getClaimHash(claimHashObject)
}