import { getNetworkType, Network } from '../../networks';
import {
  filterApplicationInboundQuery,
  filterApplicationOutboundQuery,
  latestApplicationsInboundsQuery,
  latestApplicationsOutboundsQuery,
  latestBlockQuery,
  latestInboundsQuery,
  latestOutboundsQuery,
  latestTransactionsOfAddressQuery,
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

  /**
   * Fetches latest Blocks
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Blocks}
   * @throws {Error}
   */
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

  /**
   * Fetches specific Block
   * @param {string} height BlocjHeight
   * @return {Block}
   * @throws {Error}
   */
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
  /**
   * Fetches latest Transactions
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Transactions}
   * @throws {Error}
   */
  public async getLatestTransactions(limit: Number = 10, offset: Number = 1) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        this.applicationAddress
          ? latestTransactionsOfAddressQuery
          : latestTransactionsQuery,
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
  /**
   * Fetches latest Transactions for a specific address
   * @param {string} address Address
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Transactions}
   * @throws {Error}
   */
  public async getLatestTransactionsByAddress(
    address: String,
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestTransactionsOfAddressQuery,
        {
          address: address,
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestTransactions | ${e}`);
    }
  }
  /**
   * Fetches specific Transaction
   * @param {string} hash
   * @return {Transaction}
   * @throws {Error}
   */
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
  /**
   * Fetches latest Inbounds
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Inbounds}
   * @throws {Error}
   */
  public async getLatestInbounds(limit: Number = 10, offset: Number = 1) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        this.applicationAddress
          ? latestApplicationsInboundsQuery
          : latestInboundsQuery,
        {
          address: this.applicationAddress,
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestInbounds | ${e}`);
    }
  }
  /**
   * Fetches filtered outbound by search term
   * @param {string} searchTerm Could be source sender address or source transaction hash or router contract address
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Inbounds}
   * @throws {Error}
   */
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
  //For Application specific contracts

  /**
   * Fetches filtered inbounds application specific
   * @param {string} searchTerm Could be source sender address or source transaction hash or router contract address
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Blocks}
   * @throws {Error}
   */

  public async getFilteredInbounds(
    searchTerm: String,
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        filterApplicationInboundQuery,
        {
          address: this.applicationAddress,
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
  /**
   * Fetches specific inbound
   * @param {string} formAttestationId
   * @return {Inbound}
   * @throws {Error}
   */
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

  /**
   * Fetches latest Outbounds
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Outbounds}
   * @throws {Error}
   */

  public async getLatestOutbounds(limit: Number = 10, offset: Number = 1) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        this.applicationAddress
          ? latestApplicationsOutboundsQuery
          : latestOutboundsQuery,
        {
          address: this.applicationAddress,
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestOutbounds | ${e}`);
    }
  }
  /**
   * Fetches specific Outbounds
   * @param {string} destinationChainType
   * @param {string} destinationChainId
   * @param {string} sourceAddress
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Outbounds}
   * @throws {Error}
   */
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
      console.log(`Error | getOutboundBySearch | ${e}`);
    }
  }
  //For Application specific contracts
  /**
   * Fetches application specific Outbounds
   * @param {string} destinationChainType
   * @param {string} destinationChainId
   * @param {string} sourceAddress
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Outbounds}
   * @throws {Error}
   */
  public async getFilteredOutbounds(
    destinationChainType: String,
    destinationChainId: String,
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        filterApplicationOutboundQuery,
        {
          address: this.applicationAddress,
          destinationChainType: destinationChainType,
          destinationChainId: destinationChainId,
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getOutboundBySearch | ${e}`);
    }
  }
  /**
   * Fetches specific Outbound
   * @param {string} formAttestationId
   * @return {Outbound}
   * @throws {Error}
   */
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
      console.log(`Error | getOutboundByAttestationId | ${e}`);
    }
  }
}
