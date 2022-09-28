import { getNetworkType, Network } from '../../networks';
import {
  latestBlockQuery,
  latestInboundsQuery,
  latestOutboundsQuery,
  latestTransactionsQuery,
  searchSpecificInboundQuery,
  searchSpecificOutboundQuery,
  specificBlockQuery,
  specificInboundQuery,
  specificOutboundQuery,
  specificTransactionQuery,
} from '../queries';
import { gqlFetcher } from '../utils';

export class RouterExplorer {
  public readonly chainEnvironment: Network;
  public readonly applicationAddress: string | null;

  constructor(chainEnvironment: string, applicationAddress: string = '') {
    this.chainEnvironment = getNetworkType(chainEnvironment);
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

  public async getLatestBlocks(limit: Number = 10, offset: Number = 1) {
    try {
      const data = await gqlFetcher(this.chainEnvironment, latestBlockQuery, {
        limit: limit,
        offset: offset,
      });
      return data;
    } catch (e) {
      console.log(`Error | getLatestBlocks | ${e}`);
    }
  }

  public async getBlockByHeight(height: Number) {
    try {
      const data = await gqlFetcher(this.chainEnvironment, specificBlockQuery, {
        height: height,
      });
      return data;
    } catch (e) {
      console.log(`Error | getLatestBlocks | ${e}`);
    }
  }

  public async getLatestTransactions(limit: Number = 10, offset: Number = 1) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestTransactionsQuery,
        {
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestTransactions | ${e}`);
    }
  }

  public async getTransactionByHash(hash: String) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        specificTransactionQuery,
        {
          hash: hash,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestTransactions | ${e}`);
    }
  }
  public async getLatestInbounds(limit: Number = 10, offset: Number = 1) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestInboundsQuery,
        {
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestInbounds | ${e}`);
    }
  }

  public async getInboundBySearch(
    searchTerm: String,
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        searchSpecificInboundQuery,
        {
          searchTerm: searchTerm,
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestInbounds | ${e}`);
    }
  }

  public async getInboundByAttestationId(formAttestationId: String) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        specificInboundQuery,
        {
          formAttestationId: formAttestationId,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestInbounds | ${e}`);
    }
  }

  public async getLatestOutbounds(limit: Number = 10, offset: Number = 1) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestOutboundsQuery,
        {
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestOutbounds | ${e}`);
    }
  }

  public async getOutboundBySearch(
    destinationChainType: String,
    destinationChainId: String,
    sourceAddress: String,
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        searchSpecificOutboundQuery,
        {
          destinationChainType: destinationChainType,
          destinationChainId: destinationChainId,
          sourceAddress: sourceAddress,
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestOutbounds | ${e}`);
    }
  }

  public async getOutboundByAttestationId(formAttestationId: String) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        specificOutboundQuery,
        {
          formAttestationId: formAttestationId,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestOutbounds | ${e}`);
    }
  }
}
