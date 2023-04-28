import { getNetworkType, Network } from '../../networks';
import {
  latestBlockQuery,
  latestTransactionsOfAddressQuery,
  latestTransactionsQuery,
  latestCrosschainsQuery,
  searchSpecificCrosschainChainIdQuery,
  searchSpecificCrosschainDestChainIdQuery,
  searchSpecificCrosschainQuery,
  searchSpecificCrosschainSrcChainIdQuery,
  specificBlockQuery,
  specificCrosschainQuery,
  specificTransactionQuery,
} from '../queries';
import { gqlFetcher } from '../utils';

/**
 * @group Router Scan Utility
 */

export class RouterExplorer {
         public readonly chainEnvironment: Network;
         public readonly applicationAddress: string | null;

         constructor(
           chainEnvironment: string,
           applicationAddress: string = ''
         ) {
           this.chainEnvironment = getNetworkType(chainEnvironment);
           this.applicationAddress = applicationAddress;
         }

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
             const data = await gqlFetcher(
               this.chainEnvironment,
               latestBlockQuery,
               {
                 timeRange,
                 limit: limit,
                 offset: offset,
               }
             );
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
             const data = await gqlFetcher(
               this.chainEnvironment,
               specificBlockQuery,
               {
                 height: height,
               }
             );
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
          * Fetches latest Crosschains
          * @param {string} timeRange Time Range
          * @param {string} limit Page Limit
          * @param {string} offset Page Number
          * @return {Crosschains}
          * @throws {Error}
          */

         public async getLatestCrosschains(
           timeRange: number[] = [],
           limit: Number = 10,
           offset: Number = 1
         ) {
           try {
             const data = await gqlFetcher(
               this.chainEnvironment,
               latestCrosschainsQuery,
               {
                 address: this.applicationAddress,
                 timeRange,
                 limit: limit,
                 offset: offset,
               }
             );
             return data;
           } catch (e) {
             console.log(`Error | getLatestCrosschains | ${e}`);
           }
         }
         /**
          * Fetches specific Crosschains
          * @param {string} timeRange Time Range
          * @param {string} searchTerm Source Sender or Source Transaction Hash
          * @param {string} limit Page Limit
          * @param {string} offset Page Number
          * @return {Crosschains}
          * @throws {Error}
          */
         public async getCrosschainBySearch(
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
                 ? searchSpecificCrosschainQuery
                 : srcChainIds.length > 0 && dstChainIds.length > 0
                 ? searchSpecificCrosschainChainIdQuery
                 : srcChainIds.length > 0
                 ? searchSpecificCrosschainSrcChainIdQuery
                 : dstChainIds.length > 0
                 ? searchSpecificCrosschainDestChainIdQuery
                 : searchSpecificCrosschainQuery,
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
             console.log(`Error | getCrosschainBySearch | ${e}`);
           }
         }
         /**
          * Fetches specific Crosschain
          * @param {string} formAttestationId
          * @return {Crosschain}
          * @throws {Error}
          */
         public async getCrosschainByAttestationId(formAttestationId: String) {
           try {
             const data = await gqlFetcher(
               this.chainEnvironment,
               specificCrosschainQuery,
               {
                 formAttestationId: formAttestationId,
               }
             );
             return data;
           } catch (e) {
             console.log(`Error | getCrosschainByAttestationId | ${e}`);
           }
         }
       }
