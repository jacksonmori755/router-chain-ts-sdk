import { OutboundAckClaimHash } from "@routerprotocol/chain-api/outbound/outbound_ack_pb";
import { getClaimHash } from "./util";

export function getMsgOutboundAckClaimHash(claimHashObject: OutboundAckClaimHash.AsObject) : Uint8Array {
    return getClaimHash(claimHashObject)
}
