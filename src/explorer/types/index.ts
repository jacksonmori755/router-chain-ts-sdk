export interface KeyValueString {
  [key: string]: string;
}

export interface KeyValueAny {
  [key: string]: any;
}

interface EventHistoryType {
  name: string;
  timestamp: number;
  height: number;
}

export interface TransactionType {
  _id: string;
  height: number;
  sender: string;
  status: string;
  receiver: string;
  timestamp: number;
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
  timestamp: number;
  total_gas: string;
  block_reward: string;
  processed: number;
  transactions: TransactionType[];
}

export interface InboundType {
  id: string;
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
  createdAt: number;
  delegationErrorResponse: string;
  feePayer: string;
  eventHistory: EventHistoryType[];
  historyStatus: {
    status: string;
    txnHash: string;
    timestamp: number;
    blockHeight: number;
  }[];
  confirmations: {
    validator: string;
    txnHash: string;
    timestamp: number;
  }[];
  outbounds: OutboundType[];
  inboundOutboundMapping: {
    middlewareContract: string;
    outboundDocMap: string;
    inboundDocMap: string;
    blockHeight: number;
    timestamp: number;
  };
}

export interface OutboundType {
  id: string;
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
  createdAt: number;
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
  eventHistory: EventHistoryType[];
  historyStatus: {
    status: string;
    txnHash: string;
    timestamp: number;
    blockHeight: number;
  }[];
  outboundSignatures: {
    validator: string;
    txnHash: string;
    timestamp: number;
    blockHeight: number;
  }[];
  outboundACKSignatures: {
    validator: string;
    txnHash: string;
    timestamp: number;
    blockHeight: number;
  }[];
  confirmations: {
    validator: string;
    txnHash: string;
    timestamp: number;
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

interface HistoryStatusType {
  status: string;
  txnHash: string;
  timestamp: number;
}

interface AckReceipt {
  eventnonce: number;
  blockheight: number;
  relayerrouteraddress: string;
  chaintype: number;
  chainid: string;
  txhash: string;
  eventidentifier: number;
  status: number;
}

interface AckReceiptRequest {
  relayerfeeinroute: string;
  refundfeeinroute: string;
  ackreceiptkey: string;
  status: string;
  claimhash: string;
  historystatus: HistoryStatusType[];
  ackreceipt: AckReceipt;
}

interface AckRequest {
  ackgaslimit: number;
  ackgasprice: number;
  eventattestationvote: string;
  status: string;
  claimhash: string;
  txfeeinroute: string;
  chaintype: string;
  chainid: string;
  eventnonce: number;
  customformattestationid: string;
  ackreceiptrequest: AckReceiptRequest;
  voter: string[];
  historystatus: HistoryStatusType[];
}

export interface CrossTalkType {
  id: string;
  attestationId: string;
  createdAt: number;
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
  feePayer: string;
  AckRequest: AckRequest;
  eventHistory: EventHistoryType[];
  historyStatus: {
    status: string;
    txnHash: string;
    timestamp: number;
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
    timestamp: number;
    blockHeight: string;
    signature: string;
    ethSigner: string;
  }[];
  eventAckConfirmSignatures: {
    validator: string;
    txnHash: string;
    timestamp: number;
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
