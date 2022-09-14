import {
  Supply as GrpcSupply,
  Params as GrpcBankParams,
  SendEnabled,
} from '@routerprotocol/chain-api/cosmos/bank/v1beta1/bank_pb';
import { Coin } from '../../../ts-types';

export interface BankModuleParams {
  sendEnabledList: Array<SendEnabled.AsObject>;
  defaultSendEnabled: boolean;
}

export interface TotalSupply extends Array<Coin> {
  //
}

export { GrpcSupply, GrpcBankParams };
