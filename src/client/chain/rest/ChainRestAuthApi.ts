import {
  HttpRequestException,
  UnspecifiedErrorCode,
} from '../../../exceptions';
import BaseRestConsumer from '../../BaseRestConsumer';
import { ChainModule } from '../types';
import {
  AccountResponse,
  BaseAccountRestResponse,
  CosmosAccountRestResponse,
  RestApiResponse,
} from '../types/auth-rest';

/**
 * @category Chain Rest API
 */
export class ChainRestAuthApi extends BaseRestConsumer {
         /**
          * Looks up the account information for the Router address.
          *
          * @param address address of account to look up
          */
         public async fetchAccount(address: string): Promise<AccountResponse> {
           try {
             const response = (await this.get(
               `cosmos/auth/v1beta1/accounts/${address}`
             )) as RestApiResponse<AccountResponse>;

             return response.data;
           } catch (e) {
             if (e instanceof HttpRequestException) {
               throw e;
             }

             throw new HttpRequestException(new Error((e as any).message), {
               code: UnspecifiedErrorCode,
               contextModule: ChainModule.Auth,
             });
           }
         }

         /**
          * Looks up the account information for any cosmos chain address.
          *
          * @param address address of account to look up
          */
         public async fetchCosmosAccount(
           address: string
         ): Promise<BaseAccountRestResponse> {
           try {
             const isRouterAddress = address.startsWith('router');
             const response = (await this.get(
               `cosmos/auth/v1beta1/accounts/${address}`
             )) as RestApiResponse<AccountResponse | CosmosAccountRestResponse>;

             const baseAccount = isRouterAddress
               ? (response.data as AccountResponse).account.base_account
               : (response.data as CosmosAccountRestResponse).account;

             return baseAccount;
           } catch (e) {
             if (e instanceof HttpRequestException) {
               throw e;
             }

             throw new HttpRequestException(new Error((e as any).message), {
               code: UnspecifiedErrorCode,
               contextModule: ChainModule.Auth,
             });
           }
         }
       }
