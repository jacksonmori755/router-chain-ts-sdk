export const latestBlockQuery = `query getLatestBlocks($limit: Int!, $timeRange:[Int],$offset: Int!){
  paginatedBlock(sortBy:{_id:desc},filter:{timestamp:{range:$timeRange}},limit:$limit,offset:$offset){
    totalRecords
    blocks{
      _id
      hash
      proposer
      txn_count
      timestamp
      transactions{
         _id
        height
        sender
        status
        receiver
        timestamp
        gasWanted
        gasUsed
        fee
        event_logs
        success
        routePrice
      }
    }
  }
}
`;

export const specificBlockQuery = `
  query getBlockByHeight($height: Int!){
  block(_id:$height){
    _id
    hash
    proposer
    txn_count
    timestamp
    transactions{
         _id
        height
        sender
        status
        receiver
        timestamp
        gasWanted
        gasUsed
        fee
        event_logs
        success
        routePrice
    }
  }
}
`;
export const latestTransactionsQuery = `
  query getLatestTransactions($timeRange:[Int], $limit: Int!, $offset: Int!){
    paginatedTransaction(filter:{timestamp:{range:$timeRange}},sortBy:{height:desc,timestamp:desc},limit:$limit,offset:$offset){
    totalRecords
  transactions{
     _id
    height
    sender
    status
    receiver
    timestamp
    gasWanted
    gasUsed
    fee
    event_logs
    success
    rawLog
    routePrice
  }
  }
}
`;

export const latestTransactionsOfAddressQuery = `
  query getLatestTransactions($timeRange:[Int], $address: String!,$limit: Int!, $offset: Int!){
   paginatedTransaction(filter:{timestamp:{range:$timeRange}}, where_or:{sender:$address, receiver:$address}, sortBy:{height:desc,timestamp:desc}, limit:$limit, offset:$offset){
    totalRecords
    transactions{
      _id
      height
      sender
      status
      receiver
      timestamp
      gasWanted
      gasUsed
      fee
      event_logs
      success
      rawLog
      routePrice
    }
  }
}
`;

export const specificTransactionQuery = `
  query getTransactionByHash($hash: String!){
  transaction(_id:$hash){
    _id
    height
    sender
    status
    receiver
    timestamp
    gasWanted
    gasUsed
    fee
    event_logs
    success
    rawLog
    routePrice
  }
}
`;

export const latestCrosschainsQuery = `
  query getLatestCrosschains($timeRange:[Int], $limit: Int!, $offset: Int!){
    paginatedCrosschain(filter:{updatedAt:{range:$timeRange}}, sortBy:{blockHeight:desc}, limit:$limit, offset:$offset){
    totalRecords
    crosschains{
      id
      attestationId
      srcChainId
      requestIdentifier
      blockHeight
      sourceTxHash
      srcTimestamp
      srcTxOrigin
      routeAmount
      routeRecipient
      destChainId
      requestSender
      requestMetadata{
        destGasLimit
        destGasPrice
        ackGasLimit
        ackGasPrice
        ackType
        isReadCall
        asmAddress
      }
      requestPacket{
        handler
        payload
      }
      srcChainType
      destChainType
      status
      eventHistory{
        name
        height
        timestamp
        txnHash
        height
      }
      historyStatus{
        status
        txnHash
        timestamp
      }
      eventConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      ackRequest{
        eventAckRequestCreated{
          attestationId
          ackSrcChainId
          ackRequestIdentifier
          blockHeight
          destTxHash
          relayerRouterAddress
          ackDestChainId
          requestSender
          requestIdentifier
          ackSrcChainType
          ackDestChainType
          execData
          execStatus
          status
        }
        eventAckRequestConfirm{
          ackSrcChainId
          ackRequestIdentifier
          claimHash
          ethSigner
          signature
          orchestrator
        }
        status
        historyStatus{
          status
          txnHash
          timestamp
        }
        claimHash
        txFeeInRoute
        chainType
        chainId
        requestIdentifier
        customFormAttestationId
        ackReceiptRequest{
          ackReceipt{
            attestationId
            ackReceiptSrcChainId
            ackReceiptIdentifier
            ackReceiptBlockHeight
            ackReceiptTxHash
            relayerRouterAddress
            requestIdentifier
            status
          }
          historyStatus{
            status
            txnHash
            timestamp
          }
          relayerFeeInRoute
          refundFeeInRoute
          ackReceiptKey
          status
          claimHash
        }
        ackGasLimit
        ackGasPrice
        feePayer
        relayerFeeInRoute
        refundFeeInRoute
        errorResponse
        eventSignatures{
          chainType
          chainId
          eventNonce
          voter
          blockHeight
          timestamp
        }
      }
      customFormAttestationId
      destinationTxHash
      eventAckConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      createdAt
      updatedAt
      destTxFeeInRoute
      relayerFee
			relayerFeeInRoute
      refundFeeInRoute
      feePayer
      errorResponse
      relayerAddress
      execStatus
      execData
      eventSignatures{
        chainType
        chainId
        eventNonce
        voter
        blockHeight
        timestamp
      }
    }
    }
}
`;

export const specificCrosschainQuery = `
  query getCrosschainByFormAttestationId($formAttestationId: String!){
  crosschain(id:$formAttestationId){
    id
      attestationId
      srcChainId
      requestIdentifier
      blockHeight
      sourceTxHash
      srcTimestamp
      srcTxOrigin
      routeAmount
      routeRecipient
      destChainId
      requestSender
      requestMetadata{
        destGasLimit
        destGasPrice
        ackGasLimit
        ackGasPrice
        ackType
        isReadCall
        asmAddress
      }
      requestPacket{
        handler
        payload
      }
      srcChainType
      destChainType
      status
      eventHistory{
        name
        height
        timestamp
        txnHash
        height
      }
      historyStatus{
        status
        txnHash
        timestamp
      }
      eventConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      ackRequest{
        eventAckRequestCreated{
          attestationId
          ackSrcChainId
          ackRequestIdentifier
          blockHeight
          destTxHash
          relayerRouterAddress
          ackDestChainId
          requestSender
          requestIdentifier
          ackSrcChainType
          ackDestChainType
          execData
          execStatus
          status
        }
        eventAckRequestConfirm{
          ackSrcChainId
          ackRequestIdentifier
          claimHash
          ethSigner
          signature
          orchestrator
        }
        status
        historyStatus{
          status
          txnHash
          timestamp
        }
        claimHash
        txFeeInRoute
        chainType
        chainId
        requestIdentifier
        customFormAttestationId
        ackReceiptRequest{
          ackReceipt{
            attestationId
            ackReceiptSrcChainId
            ackReceiptIdentifier
            ackReceiptBlockHeight
            ackReceiptTxHash
            relayerRouterAddress
            requestIdentifier
            status
          }
          historyStatus{
            status
            txnHash
            timestamp
          }
          relayerFeeInRoute
          refundFeeInRoute
          ackReceiptKey
          status
          claimHash
        }
        ackGasLimit
        ackGasPrice
        feePayer
        relayerFeeInRoute
        refundFeeInRoute
        errorResponse
        eventSignatures{
          chainType
          chainId
          eventNonce
          voter
          blockHeight
          timestamp
        }
      }
      customFormAttestationId
      destinationTxHash
      eventAckConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      createdAt
      updatedAt
      destTxFeeInRoute
      relayerFee
			relayerFeeInRoute
      refundFeeInRoute
      feePayer
      errorResponse
      relayerAddress
      execStatus
      execData
      eventSignatures{
        chainType
        chainId
        eventNonce
        voter
        blockHeight
        timestamp
      }
  }
}
`;
export const searchSpecificCrosschainQuery = `
  query getCrosschainByFormAttestationId($timeRange:[Int], $searchTerm: String! ,$limit: Int!, $offset: Int!){
  paginatedCrosschain(filter:{createdAt:{range:$timeRange}},where_or:{sourceTxHash:$searchTerm, srcTxOrigin:$searchTerm},sortBy:{blockHeight:desc},limit:$limit,offset:$offset){
    totalRecords
    crosschains{
      id
      attestationId
      srcChainId
      requestIdentifier
      blockHeight
      sourceTxHash
      srcTimestamp
      srcTxOrigin
      routeAmount
      routeRecipient
      destChainId
      requestSender
      requestMetadata{
        destGasLimit
        destGasPrice
        ackGasLimit
        ackGasPrice
        ackType
        isReadCall
        asmAddress
      }
      requestPacket{
        handler
        payload
      }
      srcChainType
      destChainType
      status
      eventHistory{
        name
        height
        timestamp
        txnHash
        height
      }
      historyStatus{
        status
        txnHash
        timestamp
      }
      eventConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      ackRequest{
        eventAckRequestCreated{
          attestationId
          ackSrcChainId
          ackRequestIdentifier
          blockHeight
          destTxHash
          relayerRouterAddress
          ackDestChainId
          requestSender
          requestIdentifier
          ackSrcChainType
          ackDestChainType
          execData
          execStatus
          status
        }
        eventAckRequestConfirm{
          ackSrcChainId
          ackRequestIdentifier
          claimHash
          ethSigner
          signature
          orchestrator
        }
        status
        historyStatus{
          status
          txnHash
          timestamp
        }
        claimHash
        txFeeInRoute
        chainType
        chainId
        requestIdentifier
        customFormAttestationId
        ackReceiptRequest{
          ackReceipt{
            attestationId
            ackReceiptSrcChainId
            ackReceiptIdentifier
            ackReceiptBlockHeight
            ackReceiptTxHash
            relayerRouterAddress
            requestIdentifier
            status
          }
          historyStatus{
            status
            txnHash
            timestamp
          }
          relayerFeeInRoute
          refundFeeInRoute
          ackReceiptKey
          status
          claimHash
        }
        ackGasLimit
        ackGasPrice
        feePayer
        relayerFeeInRoute
        refundFeeInRoute
        errorResponse
        eventSignatures{
          chainType
          chainId
          eventNonce
          voter
          blockHeight
          timestamp
        }
      }
      customFormAttestationId
      destinationTxHash
      eventAckConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      createdAt
      updatedAt
      destTxFeeInRoute
      relayerFee
			relayerFeeInRoute
      refundFeeInRoute
      feePayer
      errorResponse
      relayerAddress
      execStatus
      execData
      eventSignatures{
        chainType
        chainId
        eventNonce
        voter
        blockHeight
        timestamp
      }
    }
    }
}
`;

export const searchSpecificCrosschainSrcChainIdQuery = `
  query getCrosschainByFormAttestationId($timeRange:[Int],$sourceChainIds: [String],$searchTerm: String! ,$limit: Int!, $offset: Int!){
  paginatedCrosschain(filter:{srcChainId:{in:$sourceChainIds}, createdAt:{range:$timeRange}},where_or:{sourceTxHash:$searchTerm, srcTxOrigin:$searchTerm},sortBy:{blockHeight:desc},limit:$limit,offset:$offset){
    totalRecords
    crosschains{
      id
      attestationId
      srcChainId
      requestIdentifier
      blockHeight
      sourceTxHash
      srcTimestamp
      srcTxOrigin
      routeAmount
      routeRecipient
      destChainId
      requestSender
      requestMetadata{
        destGasLimit
        destGasPrice
        ackGasLimit
        ackGasPrice
        ackType
        isReadCall
        asmAddress
      }
      requestPacket{
        handler
        payload
      }
      srcChainType
      destChainType
      status
      eventHistory{
        name
        height
        timestamp
        txnHash
        height
      }
      historyStatus{
        status
        txnHash
        timestamp
      }
      eventConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      ackRequest{
        eventAckRequestCreated{
          attestationId
          ackSrcChainId
          ackRequestIdentifier
          blockHeight
          destTxHash
          relayerRouterAddress
          ackDestChainId
          requestSender
          requestIdentifier
          ackSrcChainType
          ackDestChainType
          execData
          execStatus
          status
        }
        eventAckRequestConfirm{
          ackSrcChainId
          ackRequestIdentifier
          claimHash
          ethSigner
          signature
          orchestrator
        }
        status
        historyStatus{
          status
          txnHash
          timestamp
        }
        claimHash
        txFeeInRoute
        chainType
        chainId
        requestIdentifier
        customFormAttestationId
        ackReceiptRequest{
          ackReceipt{
            attestationId
            ackReceiptSrcChainId
            ackReceiptIdentifier
            ackReceiptBlockHeight
            ackReceiptTxHash
            relayerRouterAddress
            requestIdentifier
            status
          }
          historyStatus{
            status
            txnHash
            timestamp
          }
          relayerFeeInRoute
          refundFeeInRoute
          ackReceiptKey
          status
          claimHash
        }
        ackGasLimit
        ackGasPrice
        feePayer
        relayerFeeInRoute
        refundFeeInRoute
        errorResponse
        eventSignatures{
          chainType
          chainId
          eventNonce
          voter
          blockHeight
          timestamp
        }
      }
      customFormAttestationId
      destinationTxHash
      eventAckConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      createdAt
      updatedAt
      destTxFeeInRoute
      relayerFee
			relayerFeeInRoute
      refundFeeInRoute
      feePayer
      errorResponse
      relayerAddress
      execStatus
      execData
      eventSignatures{
        chainType
        chainId
        eventNonce
        voter
        blockHeight
        timestamp
      }
    }
    }
}
`;

export const searchSpecificCrosschainDestChainIdQuery = `
  query getCrosschainByFormAttestationId($timeRange:[Int],$destinationChainIds: [String],$searchTerm: String! ,$limit: Int!, $offset: Int!){
  paginatedCrosschain(filter:{destChainId:{in:$destinationChainIds},createdAt:{range:$timeRange}},where_or:{sourceTxHash:$searchTerm, srcTxOrigin:$searchTerm},sortBy:{blockHeight:desc},limit:$limit,offset:$offset){
    totalRecords
    crosschains{
     id
      attestationId
      srcChainId
      requestIdentifier
      blockHeight
      sourceTxHash
      srcTimestamp
      srcTxOrigin
      routeAmount
      routeRecipient
      destChainId
      requestSender
      requestMetadata{
        destGasLimit
        destGasPrice
        ackGasLimit
        ackGasPrice
        ackType
        isReadCall
        asmAddress
      }
      requestPacket{
        handler
        payload
      }
      srcChainType
      destChainType
      status
      eventHistory{
        name
        height
        timestamp
        txnHash
        height
      }
      historyStatus{
        status
        txnHash
        timestamp
      }
      eventConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      ackRequest{
        eventAckRequestCreated{
          attestationId
          ackSrcChainId
          ackRequestIdentifier
          blockHeight
          destTxHash
          relayerRouterAddress
          ackDestChainId
          requestSender
          requestIdentifier
          ackSrcChainType
          ackDestChainType
          execData
          execStatus
          status
        }
        eventAckRequestConfirm{
          ackSrcChainId
          ackRequestIdentifier
          claimHash
          ethSigner
          signature
          orchestrator
        }
        status
        historyStatus{
          status
          txnHash
          timestamp
        }
        claimHash
        txFeeInRoute
        chainType
        chainId
        requestIdentifier
        customFormAttestationId
        ackReceiptRequest{
          ackReceipt{
            attestationId
            ackReceiptSrcChainId
            ackReceiptIdentifier
            ackReceiptBlockHeight
            ackReceiptTxHash
            relayerRouterAddress
            requestIdentifier
            status
          }
          historyStatus{
            status
            txnHash
            timestamp
          }
          relayerFeeInRoute
          refundFeeInRoute
          ackReceiptKey
          status
          claimHash
        }
        ackGasLimit
        ackGasPrice
        feePayer
        relayerFeeInRoute
        refundFeeInRoute
        errorResponse
        eventSignatures{
          chainType
          chainId
          eventNonce
          voter
          blockHeight
          timestamp
        }
      }
      customFormAttestationId
      destinationTxHash
      eventAckConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      createdAt
      updatedAt
      destTxFeeInRoute
      relayerFee
			relayerFeeInRoute
      refundFeeInRoute
      feePayer
      errorResponse
      relayerAddress
      execStatus
      execData
      eventSignatures{
        chainType
        chainId
        eventNonce
        voter
        blockHeight
        timestamp
      }
    }
    }
}
`;

export const searchSpecificCrosschainChainIdQuery = `
  query getCrosschainByFormAttestationId($timeRange:[Int], $sourceChainIds: [String],$destinationChainIds: [String],$searchTerm: String! ,$limit: Int!, $offset: Int!){
  paginatedCrosschain(filter:{srcChainId:{in:$sourceChainIds},destChainId:{in:$destinationChainIds}, createdAt:{range:$timeRange}},where_or:{sourceTxHash:$searchTerm, srcTxOrigin:$searchTerm},sortBy:{blockHeight:desc},limit:$limit,offset:$offset){
    totalRecords
    crosschains{
      id
      attestationId
      srcChainId
      requestIdentifier
      blockHeight
      sourceTxHash
      srcTimestamp
      srcTxOrigin
      routeAmount
      routeRecipient
      destChainId
      requestSender
      requestMetadata{
        destGasLimit
        destGasPrice
        ackGasLimit
        ackGasPrice
        ackType
        isReadCall
        asmAddress
      }
      requestPacket{
        handler
        payload
      }
      srcChainType
      destChainType
      status
      eventHistory{
        name
        height
        timestamp
        txnHash
        height
      }
      historyStatus{
        status
        txnHash
        timestamp
      }
      eventConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      ackRequest{
        eventAckRequestCreated{
          attestationId
          ackSrcChainId
          ackRequestIdentifier
          blockHeight
          destTxHash
          relayerRouterAddress
          ackDestChainId
          requestSender
          requestIdentifier
          ackSrcChainType
          ackDestChainType
          execData
          execStatus
          status
        }
        eventAckRequestConfirm{
          ackSrcChainId
          ackRequestIdentifier
          claimHash
          ethSigner
          signature
          orchestrator
        }
        status
        historyStatus{
          status
          txnHash
          timestamp
        }
        claimHash
        txFeeInRoute
        chainType
        chainId
        requestIdentifier
        customFormAttestationId
        ackReceiptRequest{
          ackReceipt{
            attestationId
            ackReceiptSrcChainId
            ackReceiptIdentifier
            ackReceiptBlockHeight
            ackReceiptTxHash
            relayerRouterAddress
            requestIdentifier
            status
          }
          historyStatus{
            status
            txnHash
            timestamp
          }
          relayerFeeInRoute
          refundFeeInRoute
          ackReceiptKey
          status
          claimHash
        }
        ackGasLimit
        ackGasPrice
        feePayer
        relayerFeeInRoute
        refundFeeInRoute
        errorResponse
        eventSignatures{
          chainType
          chainId
          eventNonce
          voter
          blockHeight
          timestamp
        }
      }
      customFormAttestationId
      destinationTxHash
      eventAckConfirmSignatures{
        validator
        txnHash
        timestamp
        blockHeight
        signature
        ethSigner
      }
      createdAt
      updatedAt
      destTxFeeInRoute
      relayerFee
			relayerFeeInRoute
      refundFeeInRoute
      feePayer
      errorResponse
      relayerAddress
      execStatus
      execData
      eventSignatures{
        chainType
        chainId
        eventNonce
        voter
        blockHeight
        timestamp
      }
    }
    }
}
`;

//const x = gql(latestBlockQuery) for apollo client DocumentNode
