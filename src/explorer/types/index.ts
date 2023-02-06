export interface KeyValueString {
  [key: string]: string;
}

export interface KeyValueAny {
  [key: string]: any;
}

export interface TransactionType {
  _id: string;
  height: number;
  sender: string;
  status: string;
  receiver: string;
  timeStamp: string;
  gasWanted: string;
  gasUsed: string;
  fee: string;
  event_logs: string;
  success: string;
  txnRaw: string;
  rawLog: string;
  routePrice: string;
}

export interface BlockType {
  _id: number;
  hash: string;
  proposer: string;
  txn_count: number;
  timestamp: string;
  total_gas: string;
  block_reward: string;
  processed: number;
  transactions: TransactionType[];
}

export interface InboundType {
  attestationId: string;
  chainType: string;
  attestationType: string;
  chainId: string;
  eventNonce: number;
  blockHeight: number;
  sourceTxHash: string;
  sourceSender: string;
  routerBridgeContract: string;
  payload: string;
  status: string;
  formAttestationId: string;
  delegationErrorResponse: string;
  historyStatus: {
    status: string;
    txnHash: string;
    timestamp: string;
    blockHeight: number;
  }[];
  confirmations: {
    validator: string;
    txnHash: string;
    timestamp: string;
  }[];
}

export interface OutboundType {
  outgoingTxNonce: number;
  destinationChainType: string;
  destinationChainId: string;
  relayerFee: string;
  outgoingTxFee: string;
  isAtomic: Boolean;
  sourceAddress: string;
  expiryTimestamp: number;
  status: string;
  contractCalls: string;
  formAttestationId: string;
  attestationId: string;
  outboundTxRequestedBy: string;
  destinationTxHash: string;
  feeConsumed: number;
  blockHeight: number;
  destinationGasLimit: number;
  destinationGasPrice: number;
  outgoingTxFeeInRoute: string;
  relayerFeeInRoute: string;
  refundFeeInRoute: string;
  delegationErrorResponse: string;
  historyStatus: {
    status: string;
    txnHash: string;
    timestamp: string;
    blockHeight: number;
  }[];
  outboundSignatures: {
    validator: string;
    txnHash: string;
    timestamp: string;
    blockHeight: number;
  }[];
  outboundACKSignatures: {
    validator: string;
    txnHash: string;
    timestamp: string;
    blockHeight: number;
  }[];
  confirmations: {
    validator: string;
    txnHash: string;
    timestamp: string;
    blockHeight: number;
  }[];
  contractsExecutionData: {
    destContractAddress: string;
    status: Boolean;
    requestPayload: string;
    responsePayload: string;
  }[];
  contractAckResponses: Boolean[];
}

export interface CrossTalkType {
  attestationId: string;
  formAttestationId: string;
  eventNonce: number;
  blockHeight: number;
  sourceChainType: string;
  sourceChainId: string;
  sourceTxHash: string;
  destinationChainType: string;
  destinationChainId: string;
  destinationTxHash: string;
  destinationGasLimit: number;
  destinationGasPrice: number;
  requestSender: string;
  requestNonce: number;
  isAtomic: Boolean;
  expiryTimestamp: number;
  ackType: number;
  ackGasLimit: number;
  ackGasPrice: number;
  isReadCall: boolean;
  requestTxOrigin: string;
  claimHash: string;
  destinationTxFeeInRoute: string;
  relayerFeeInRoute: string;
  refundFeeInRoute: string;
  historyStatus: {
    status: string;
    txnHash: string;
    timestamp: string;
    blockHeight: number;
  }[];
  contractsExecutionData: {
    destContractAddress: string;
    status: Boolean;
    requestPayload: string;
    responsePayload: string;
  }[];
  eventConfirmSignatures: {
    validator: string;
    txnHash: string;
    timestamp: string;
    blockHeight: string;
    signature: string;
    ethSigner: string;
  }[];
  eventAckConfirmSignatures: {
    validator: string;
    txnHash: string;
    timestamp: string;
    blockHeight: string;
    signature: string;
    ethSigner: string;
  }[];
}

export interface PaginatedBlock {
  totalRecords: number;
  blocks: BlockType[];
}

export interface PaginatedTransaction {
  totalRecords: number;
  transactions: TransactionType[];
}

export interface PaginatedInbound {
  totalRecords: number;
  inbounds: InboundType[];
}

export interface PaginatedOutbound {
  totalRecords: number;
  outbounds: OutboundType[];
}

export interface PaginatedCrossTalk {
  totalRecords: number;
  crossTalks: CrossTalkType[];
}
