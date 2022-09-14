import { latestBlockQuery, specificBlockQuery } from "../queries";
import { gqlFetcher } from "../utils";

export class RouterExplorer {
  public readonly chainEnvironment: string;
  public readonly applicationAddress: string;

  constructor(chainEnvironment: string, applicationAddress: string) {
    this.chainEnvironment = chainEnvironment;
    this.applicationAddress = applicationAddress;
  }

  // public async getLatestTransactions(limit:number, offset:number){
  // // Fetch latest txn related to the contract related to the application contract
  // }

  // public async getTransaction(transactionHash:string){
  // //Fetch a particular txn with txn hash
  // }

  // public async getInboundTransactions(limit:number, offset:number){
  // //Fetch latest inbound txns related to application contract
  // }

  // public async getInboundTransaction(inboundNonce: string, chainId:ChainIdType, chainType:ChainTypeType){
  // // Fetch a particular inbound transaction
  // }

  // public async getOutboundTransactions(limit:number, offset:number){
  // //Fetch latest outbound txns related to application contract
  // }

  // public async getOutboundTransaction(inboundNonce: string, chainId:ChainIdType, chainType:ChainTypeType){
  // // Fetch a particular outbound transaction
  // }

  //Fetch latest blocks from explorer db
  
  public async getLatestBlocks(limit: Number = 10, offset: Number = 1){
    try {
      const data = gqlFetcher(this.chainEnvironment,latestBlockQuery,{limit:limit,offset:offset})
      return data
    } catch (e) {
      console.log(`Error | getLatestBlocks | ${e}`);
    }
  }

  public async getBlockByHeight(height: Number){
    try {
      const data = gqlFetcher(this.chainEnvironment,specificBlockQuery,{height:height})
      return data
    } catch (e) {
      console.log(`Error | getLatestBlocks | ${e}`);
    }
  }
}