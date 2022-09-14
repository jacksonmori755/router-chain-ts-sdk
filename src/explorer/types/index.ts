export interface KeyValueString{
    [key:string]: string
}

export interface KeyValueAny{
    [key:string]: any
}

export interface BlockType{
    _id: Number
    hash: String
    proposer:  String
    txn_count: Number
    timestamp: String
    total_gas: String
    block_reward: String
    processed: Number
  }