import { getNetworkType, Network } from '../../networks';
import {
  filterApplicationInboundQuery,
  filterApplicationOutboundDestChainQuery,
  filterApplicationOutboundQuery,
  latestApplicationsInboundsQuery,
  latestApplicationsOutboundsQuery,
  latestBlockQuery,
  latestCrossTalksQuery,
  latestInboundsQuery,
  latestOutboundsQuery,
  latestTransactionsOfAddressQuery,
  latestTransactionsQuery,
  searchSpecificCrossTalkChainIdQuery,
  searchSpecificCrossTalkDestChainIdQuery,
  searchSpecificCrossTalkQuery,
  searchSpecificCrossTalkSrcChainIdQuery,
  searchSpecificInboundQuery,
  searchSpecificInboundSrcChainIdQuery,
  searchSpecificOutboundDestChainIdQuery,
  searchSpecificOutboundQuery,
  specificBlockQuery,
  specificCrossTalkQuery,
  specificInboundQuery,
  specificOutboundQuery,
  specificTransactionQuery,
} from '../queries';
import { gqlFetcher } from '../utils';

/**
 * @group Router Scan Utility
 */

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
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Blocks}
   * @throws {Error}
   */
  public async getLatestBlocks(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(this.chainEnvironment, latestBlockQuery, {
        timeRange,
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
   * @param {string} height BlockHeight
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
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Transactions}
   * @throws {Error}
   */
  public async getLatestTransactions(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        this.applicationAddress
          ? latestTransactionsOfAddressQuery
          : latestTransactionsQuery,
        {
          timeRange,
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
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestTransactionsOfAddressQuery,
        {
          timeRange,
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
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Inbounds}
   * @throws {Error}
   */
  public async getLatestInbounds(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1,
    blockHeight: Number = 0,
    order: string = 'desc'
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        this.applicationAddress
          ? latestApplicationsInboundsQuery
          : latestInboundsQuery,
        {
          address: this.applicationAddress,
          timeRange,
          limit: limit,
          offset: offset,
          blockHeight: blockHeight,
          order: order,
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
   * @param {string} sourceChainIds Filter by source chain id
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Inbounds}
   * @throws {Error}
   */
  public async getInboundBySearch(
    searchTerm: String,
    sourceChainIds: string[] = [],
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        sourceChainIds.length === 0
          ? searchSpecificInboundQuery
          : searchSpecificInboundSrcChainIdQuery,
        {
          searchTerm: searchTerm,
          sourceChainIds: sourceChainIds,
          timeRange,
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
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Outbounds}
   * @throws {Error}
   */

  public async getLatestOutbounds(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        this.applicationAddress
          ? latestApplicationsOutboundsQuery
          : latestOutboundsQuery,
        {
          address: this.applicationAddress,
          timeRange,
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
   * @param {string} timeRange Time Range
   * @param {string} destinationChainId
   * @param {string} searchTerm Middleware Contract Address
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Outbounds}
   * @throws {Error}
   */
  public async getOutboundBySearch(
    searchTerm: String,
    destinationChainIds: string[] = [],
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        destinationChainIds.length === 0
          ? searchSpecificOutboundQuery
          : searchSpecificOutboundDestChainIdQuery,
        {
          destinationChainIds: destinationChainIds,
          timeRange,
          searchTerm: searchTerm,
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
   * @param {string} destinationChainId
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {Outbounds}
   * @throws {Error}
   */
  public async getFilteredOutbounds(
    destinationChainId: string[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        destinationChainId.length === 0
          ? filterApplicationOutboundQuery
          : filterApplicationOutboundDestChainQuery,
        {
          address: this.applicationAddress,
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

  /**
   * Fetches latest CrossTalks
   * @param {string} timeRange Time Range
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {CrossTalks}
   * @throws {Error}
   */

  public async getLatestCrossTalks(
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        latestCrossTalksQuery,
        {
          address: this.applicationAddress,
          timeRange,
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getLatestCrossTalks | ${e}`);
    }
  }
  /**
   * Fetches specific CrossTalks
   * @param {string} timeRange Time Range
   * @param {string} searchTerm Source Sender or Source Transaction Hash
   * @param {string} limit Page Limit
   * @param {string} offset Page Number
   * @return {CrossTalks}
   * @throws {Error}
   */
  public async getCrossTalkBySearch(
    searchTerm: String,
    srcChainIds: string[] = [],
    dstChainIds: string[] = [],
    timeRange: number[] = [],
    limit: Number = 10,
    offset: Number = 1
  ) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        srcChainIds.length === 0 && dstChainIds.length === 0
          ? searchSpecificCrossTalkQuery
          : srcChainIds.length > 0 && dstChainIds.length > 0
          ? searchSpecificCrossTalkChainIdQuery
          : srcChainIds.length > 0
          ? searchSpecificCrossTalkSrcChainIdQuery
          : dstChainIds.length > 0
          ? searchSpecificCrossTalkDestChainIdQuery
          : searchSpecificCrossTalkQuery,
        {
          sourceChainIds: srcChainIds,
          destinationChainIds: dstChainIds,
          searchTerm: searchTerm,
          timeRange,
          limit: limit,
          offset: offset,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getCrossTalkBySearch | ${e}`);
    }
  }
  /**
   * Fetches specific CrossTalk
   * @param {string} formAttestationId
   * @return {CrossTalk}
   * @throws {Error}
   */
  public async getCrossTalkByAttestationId(formAttestationId: String) {
    try {
      const data = await gqlFetcher(
        this.chainEnvironment,
        specificCrossTalkQuery,
        {
          formAttestationId: formAttestationId,
        }
      );
      return data;
    } catch (e) {
      console.log(`Error | getCrossTalkByAttestationId | ${e}`);
    }
  }
}
