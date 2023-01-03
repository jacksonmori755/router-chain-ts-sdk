import { Query as AuthQuery } from '@routerprotocol/chain-api/cosmos/auth/v1beta1/query_pb_service';
import {
  QueryAccountRequest,
  QueryAccountsRequest,
  QueryAccountsResponse,
  QueryAccountResponse,
  QueryParamsRequest,
  QueryParamsResponse,
} from '@routerprotocol/chain-api/cosmos/auth/v1beta1/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
import { paginationRequestFromPagination } from '../../../utils/pagination';
import { ChainGrpcAuthTransformer } from '../transformers/ChainGrpcAuthTransformer';

/**
 * @group gRPC API
 */
export class ChainGrpcAuthApi extends BaseConsumer {
  async fetchModuleParams() {
    const request = new QueryParamsRequest();

    try {
      const response = await this.request<
        QueryParamsRequest,
        QueryParamsResponse,
        typeof AuthQuery.Params
      >(request, AuthQuery.Params);

      return ChainGrpcAuthTransformer.moduleParamsResponseToModuleParams(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * Get account details.
   * @param address account address.
   * @returns account.
   */
  async fetchAccount(address: string) {
    const request = new QueryAccountRequest();

    request.setAddress(address);

    try {
      const response = await this.request<
        QueryAccountRequest,
        QueryAccountResponse,
        typeof AuthQuery.Account
      >(request, AuthQuery.Account);

      return ChainGrpcAuthTransformer.accountResponseToAccount(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * Get all accounts.
   * @param pagination 
   * @returns accounts.
   */
  async fetchAccounts(pagination?: PaginationOption) {
    const request = new QueryAccountsRequest();
    const paginationForRequest = paginationRequestFromPagination(pagination);

    if (paginationForRequest) {
      request.setPagination(paginationForRequest);
    }

    try {
      const response = await this.request<
        QueryAccountsRequest,
        QueryAccountsResponse,
        typeof AuthQuery.Accounts
      >(request, AuthQuery.Accounts);

      return ChainGrpcAuthTransformer.accountsResponseToAccounts(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
