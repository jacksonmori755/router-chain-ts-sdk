export const latestBlockQuery = `
  query getLatestBlocks($limit: Int!, $offset: Int!){
  blocks(sortBy:{_id:desc},limit:$limit,offset:$offset){
    _id
    hash
    proposer
    txn_count
    timestamp
  }
}
`

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
`
//const x = gql(latestBlockQuery) for apollo client DocumentNode