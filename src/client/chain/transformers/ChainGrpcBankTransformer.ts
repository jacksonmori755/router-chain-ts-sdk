import { GrpcCoin, Pagination } from '../../../types';
import { Coin } from '../../../types';
import {
  QueryAllBalancesResponse,
  QueryBalanceResponse,
  QueryTotalSupplyResponse,
  QueryParamsResponse as QueryBankParamsResponse,
} from '@routerprotocol/chain-api/cosmos/bank/v1beta1/query_pb';
import { BankModuleParams, TotalSupply } from '../types';
import { grpcPaginationToPagination } from '../../../utils/pagination';

export class ChainGrpcBankTransformer {
  static grpcCoinToCoin(coin: GrpcCoin): Coin {
    return {
      denom: coin.getDenom(),
      amount: coin.getAmount(),
    };
  }

  static grpcCoinsToCoins(coins: GrpcCoin[]): Coin[] {
    return coins.map(ChainGrpcBankTransformer.grpcCoinToCoin);
  }

  static moduleParamsResponseToModuleParams(
    response: QueryBankParamsResponse
  ): BankModuleParams {
    const params = response.getParams()!;

    return {
      sendEnabledList: params.getSendEnabledList().map(e => e.toObject()),
      defaultSendEnabled: params.getDefaultSendEnabled(),
    };
  }

  static totalSupplyResponseToTotalSupply(
    response: QueryTotalSupplyResponse
  ): {
    supply: TotalSupply;
    pagination: Pagination;
  } {
    const balances = response.getSupplyList();
    const pagination = response.getPagination();

    return {
      supply: balances.map(ChainGrpcBankTransformer.grpcCoinToCoin),
      pagination: grpcPaginationToPagination(pagination),
    };
  }

  static balanceResponseToBalance(response: QueryBalanceResponse): Coin {
    return ChainGrpcBankTransformer.grpcCoinToCoin(response.getBalance()!);
  }

  static balancesResponseToBalances(
    response: QueryAllBalancesResponse
  ): {
    balances: Coin[];
    pagination: Pagination;
  } {
    const balances = response.getBalancesList();
    const pagination = response.getPagination();

    return {
      balances: ChainGrpcBankTransformer.grpcCoinsToCoins(balances),
      pagination: grpcPaginationToPagination(pagination),
    };
  }
}
