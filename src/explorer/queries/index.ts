export const latestBlockQuery = `
  query getLatestBlocks($limit: Int!, $offset: Int!){
  paginatedBlock(sortBy:{_id:desc},limit:$limit,offset:$offset){
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
        timeStamp
        gasWanted
        gasUsed
        fee
        eventLogs
        success
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
  }
}
`;
export const latestTransactionsQuery = `
  query getLatestTransactions($limit: Int!, $offset: Int!){
    paginatedTransaction(sortBy:{height:desc,timeStamp:desc},limit:$limit,offset:$offset){
    totalRecords
  transactions{
     _id
  height
  sender
  status
  receiver
  timeStamp
  gasWanted
  gasUsed
  fee
  eventLogs
  success
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
  timeStamp
  gasWanted
  gasUsed
  fee
  eventLogs
  success
  }
}
`;


//const x = gql(latestBlockQuery) for apollo client DocumentNode