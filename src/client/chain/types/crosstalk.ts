import { sha256 } from "@cosmjs/crypto";
import { CrossTalkRequest } from "@routerprotocol/chain-api/crosstalk/cross_talk_request_pb";


/**
 * @group Util
 * 
 * Calculates claim hash by doing sha256 of CrossTalkRequest data members.
 * @param crossTalkRequest 
 * @returns claim hash
 */
export function getCrossTalkClaimHash(crossTalkRequest: CrossTalkRequest) {
    const path =
        crossTalkRequest.getEventnonce() +
        crossTalkRequest.getBlockheight() +
        crossTalkRequest.getSourcechaintype() +
        crossTalkRequest.getSourcechainid() +
        crossTalkRequest.getSourcetxhash() +
        crossTalkRequest.getDestinationchaintype() +
        crossTalkRequest.getDestinationchainid() +
        crossTalkRequest.getDestinationgaslimit() +
        crossTalkRequest.getDestinationgasprice() +
        crossTalkRequest.getRequestsender() +
        crossTalkRequest.getRequestnonce() +
        crossTalkRequest.getIsatomic() +
        crossTalkRequest.getExpirytimestamp() +
        crossTalkRequest.getDestcontractaddressesList_asB64().toString() +
        crossTalkRequest.getDestcontractpayloadsList_asB64().toString() +
        crossTalkRequest.getAcktype() +
        crossTalkRequest.getAckgaslimit() +
        crossTalkRequest.getAckgasprice();

    const path_asU8 = path.split("").map(e => e.charCodeAt(0));
    return sha256(new Uint8Array(path_asU8));
}

