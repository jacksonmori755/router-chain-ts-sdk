import MsgGrant from './authz/msgs/MsgGrant';
import MsgRevoke from './authz/msgs/MsgRevoke';
import MsgAuthzExec from './authz/msgs/MsgExec';
import MsgSend from './bank/msgs/MsgSend';
import MsgGovDeposit from './gov/msgs/MsgDeposit';
import MsgVote from './gov/msgs/MsgVote';
import MsgTransfer from './ibc/msgs/MsgTransfer';
import MsgDelegate from './staking/msgs/MsgDelegate';
import MsgUndelegate from './staking/msgs/MsgUndelegate';
import MsgBeginRedelegate from './staking/msgs/MsgBeginRedelegate';
import { MsgSubmitProposal } from './gov';
import {
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
  MsgMigrateContract,
} from './wasm';
import { MsgWithdrawDelegatorReward } from './distribution';
import { MsgApproveFeepayerRequest } from './metastore';
import {
  MsgCwStoreCode,
  MsgExecuteCwContract,
  MsgInstantiateCwContract,
  MsgMigrateCwContract,
} from './rwasm';

/**
 * @group Message
 */
export type Msgs =
  | MsgGrant
  | MsgRevoke
  | MsgAuthzExec
  | MsgSend
  | MsgGovDeposit
  | MsgSubmitProposal
  | MsgVote
  | MsgTransfer
  | MsgDelegate
  | MsgUndelegate
  | MsgWithdrawDelegatorReward
  | MsgBeginRedelegate
  | MsgStoreCode
  | MsgCwStoreCode
  | MsgInstantiateContract
  | MsgInstantiateCwContract
  | MsgExecuteContract
  | MsgExecuteCwContract
  | MsgUpdateAdmin
  | MsgMigrateContract
  | MsgMigrateCwContract
  | MsgApproveFeepayerRequest;

