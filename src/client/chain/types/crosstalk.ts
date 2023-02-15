import { CrossTalkRequestClaimHash } from "@routerprotocol/chain-api/crosstalk/cross_talk_request_pb";
import { CrossTalkAckRequestClaimHash } from "@routerprotocol/chain-api/crosstalk/cross_talk_ack_request_pb";
import { getClaimHash } from "./util";

export function getCrossTalkRequestClaimHash(claimHashObject: CrossTalkRequestClaimHash.AsObject) : Uint8Array {
    return getClaimHash(claimHashObject)
}


export function getCrossTalkAckRequestClaimHash(claimHashObject: CrossTalkAckRequestClaimHash.AsObject) : Uint8Array {
    return getClaimHash(claimHashObject)
}

export function getMsgCrossTalkRequestClaimHash(claimHashObject: CrossTalkRequestClaimHash) : Uint8Array {
    return getClaimHash(claimHashObject)
}


export function getMsgCrossTalkAckRequestClaimHash(claimHashObject: CrossTalkAckRequestClaimHash.AsObject) : Uint8Array {
    return getClaimHash(claimHashObject)
}


export function getMsgCrossTalkAckReceiptClaimHash(claimHashObject: CrossTalkAckRequestClaimHash.AsObject) : Uint8Array {
    return getClaimHash(claimHashObject)
}



