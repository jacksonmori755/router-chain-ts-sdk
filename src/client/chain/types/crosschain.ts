// TODO: New claim hash object is required
// import { CrossChainClaimHash } from "@routerprotocol/chain-api/routerchain/crosschain/claim";
import { CrosschainRequest } from "@routerprotocol/chain-api/routerchain/crosschain/crosschain_request_pb";
import { CrosschainAckRequest } from "@routerprotocol/chain-api/routerchain/crosschain/crosschain_ack_request_pb";
// import { getClaimHash } from "./util";

// crosschainRequest: CrosschainRequest.AsObject
export function getCrosschainClaimHash(crosschainRequest: CrosschainRequest.AsObject) : Uint8Array {
    //const claimHash = new CrosschainRequest()

    // claimHash.setSrcChainId(crosschainRequest.srcChainId)
    // claimHash.setRequestIdentifier(crosschainRequest.requestIdentifier)
    // claimHash.blockHeight(crosschainRequest.blockHeight)
    // claimHash.sourceTxHash(crosschainRequest.sourceTxHash)
    // claimHash.srcTimestamp(crosschainRequest.srcTimestamp)
    // claimHash.srcTxOrigin(crosschainRequest.srcTxOrigin)
    // claimHash.routeAmount(crosschainRequest.routeAmount)
    // claimHash.routeRecipient(crosschainRequest.routeRecipient)
    // claimHash.destChainId(crosschainRequest.destChainId)
    // claimHash.destChainId(crosschainRequest.destChainId)
    // claimHash.requestSender(crosschainRequest.requestSender)
    // claimHash.requestMetadata(crosschainRequest.requestMetadata)
    // claimHash.requestPacket(crosschainRequest.requestPacket)
    // claimHash.srcChainType(crosschainRequest.srcChainType)
    // claimHash.destChainType(crosschainRequest.destChainType)

    return new Uint8Array([10])
}

export function getCrosschainAckClaimHash(crosschainAckRequest: CrosschainAckRequest.AsObject) : Uint8Array {
    // const claimHash = new CrosschainAckRequest()

    // claimHash.setAckSrcChainId(crosschainRequest.ackSrcChainId)
    // claimHash.setAckRequestIdentifier(crosschainRequest.ackRequestIdentifier)
    // claimHash.setBlockheight(crosschainRequest.blockHeight)
    // claimHash.setDesttxhash(crosschainRequest.desttxhash)
    // claimHash.setRelayerrouteraddress(crosschainRequest.relayerrouteraddress)
    // claimHash.setAckDestChainId(crosschainRequest.ackDestChainId)
    // claimHash.setRequestSender(crosschainRequest.requestSender)
    // claimHash.setRequestidentifier(crosschainRequest.requestidentifier)
    // claimHash.setAckSrcChainType(crosschainRequest.ackSrcChainType)
    // claimHash.setAckDestChainType(crosschainRequest.ackDestChainType)
    // claimHash.setExecdata(crosschainRequest.execdata)
    // claimHash.setExecstatus(crosschainRequest.execstatus)
    // claimHash.setEthsigner(crosschainRequest.ethsigner)
    // claimHash.setSignature(crosschainRequest.signature)

    return new Uint8Array([10])
}
