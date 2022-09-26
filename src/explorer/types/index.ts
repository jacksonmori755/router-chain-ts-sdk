export interface KeyValueString{
    [key:string]: string
}

export interface KeyValueAny{
    [key:string]: any
}

export interface TransactionType {
  _id: String;
  height: Number;
  sender: String;
  status: String;
  receiver: String;
  timeStamp: String;
  gasWanted: String;
  gasUsed: String;
  fee: String;
  eventLogs: String;
  success: String;
  txnRaw: String;
  rawLog: String;
}

export interface BlockType {
  _id: Number;
  hash: String;
  proposer: String;
  txn_count: Number;
  timestamp: String;
  total_gas: String;
  block_reward: String;
  processed: Number;
}

export interface InboundType {
  attestationId: String;
  chainType: String;
  attestationType: String;
  chainId: String;
  eventNonce: Number;
  blockHeight: Number;
  sourceTxHash: String;
  sourceSender: String;
  routerBridgeContract: String;
  payload: String;
  status: String;
  formAttestationId: String;
}

export interface PaginatedBlock {
  totalRecords: Number;
  blocks: BlockType[];
}

export interface PaginatedTransaction {
  totalRecords: Number;
  transactions: TransactionType[];
}

export interface PaginatedInbound {
  totalRecords: Number;
  inbounds: InboundType[];
}