import { CrosschainRequestClaimHash } from "@routerprotocol/chain-api/routerchain/crosschain/crosschain_request_pb";
import { CrosschainAckRequestClaimHash } from "@routerprotocol/chain-api/routerchain/crosschain/crosschain_ack_request_pb";
import { CrosschainAckReceiptClaimHash } from "@routerprotocol/chain-api/routerchain/crosschain/crosschain_ack_receipt_pb";
import { getClaimHash } from "./util";


// crosschainRequest: CrosschainRequest.AsObject
export function getCrosschainClaimHash(crosschainRequest: CrosschainRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new CrosschainRequestClaimHash()

    claimHash.setSrcChainId(crosschainRequest.srcChainId)
    claimHash.setRequestIdentifier(crosschainRequest.requestIdentifier)
    claimHash.setBlockHeight(crosschainRequest.blockHeight)
    claimHash.setSourceTxHash(crosschainRequest.sourceTxHash)
    claimHash.setSrcTimestamp(crosschainRequest.srcTimestamp)
    claimHash.setSrcTxOrigin(crosschainRequest.srcTxOrigin)
    claimHash.setRouteAmount(crosschainRequest.routeAmount)
    claimHash.setRouteRecipient(crosschainRequest.routeRecipient)
    claimHash.setDestChainId(crosschainRequest.destChainId)
    claimHash.setRequestSender(crosschainRequest.requestSender)
    claimHash.setRequestMetadata(crosschainRequest.requestMetadata)
    claimHash.setRequestPacket(crosschainRequest.requestPacket)
    claimHash.setSrcChainType(crosschainRequest.srcChainType)
    claimHash.setDestChainType(crosschainRequest.destChainType)

    return getClaimHash(claimHash.serializeBinary())
}

export function getCrosschainAckClaimHash(crosschainAckRequest: CrosschainAckRequestClaimHash.AsObject) : Uint8Array {
    const claimHash = new CrosschainAckRequestClaimHash()

    claimHash.setAckSrcChainId(crosschainAckRequest.ackSrcChainId)
    claimHash.setAckRequestIdentifier(crosschainAckRequest.ackRequestIdentifier)
    claimHash.setBlockheight(crosschainAckRequest.blockheight)
    claimHash.setDesttxhash(crosschainAckRequest.desttxhash)
    claimHash.setRelayerrouteraddress(crosschainAckRequest.relayerrouteraddress)
    claimHash.setAckDestChainId(crosschainAckRequest.ackDestChainId)
    claimHash.setRequestSender(crosschainAckRequest.requestSender)
    claimHash.setRequestidentifier(crosschainAckRequest.requestidentifier)
    claimHash.setAckSrcChainType(crosschainAckRequest.ackSrcChainType)
    claimHash.setAckDestChainType(crosschainAckRequest.ackDestChainType)
    claimHash.setFeeconsumed(crosschainAckRequest.feeconsumed)
    claimHash.setExecdata(crosschainAckRequest.execdata)
    claimHash.setExecstatus(crosschainAckRequest.execstatus)

    return getClaimHash(claimHash.serializeBinary())
}

export function getCrosschainAckReceiptClaimHash(crosschainAckReceipt: CrosschainAckReceiptClaimHash.AsObject) : Uint8Array {
    const claimHash = new CrosschainAckReceiptClaimHash()

    claimHash.setAckreceiptsrcchainid(crosschainAckReceipt.acksrcchainid)
    claimHash.setAckReceiptIdentifier(crosschainAckReceipt.ackrequestidentifier)
    claimHash.setAckReceiptBlockheight(crosschainAckReceipt.ackReceiptBlockheight)
    claimHash.setAckReceiptTxhash(crosschainAckReceipt.ackReceiptTxhash)
    claimHash.setRelayerrouteraddress(crosschainAckReceipt.relayerrouteraddress)
    claimHash.setRequestidentifier(crosschainAckReceipt.requestidentifier)
    claimHash.setAcksrcchainid(crosschainAckReceipt.acksrcchainid)
    claimHash.setRequestidentifier(crosschainAckReceipt.requestidentifier)
    claimHash.setAcksrcchainid(crosschainAckReceipt.acksrcchainid)
    claimHash.setAckrequestidentifier(crosschainAckReceipt.ackrequestidentifier)
    claimHash.setFeeconsumed(crosschainAckReceipt.feeconsumed)

    return getClaimHash(claimHash.serializeBinary())
}
