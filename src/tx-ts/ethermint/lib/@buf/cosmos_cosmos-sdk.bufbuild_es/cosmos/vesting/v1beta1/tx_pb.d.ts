// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/vesting/v1beta1/tx.proto (package cosmos.vesting.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { Coin } from "../../base/v1beta1/coin_pb.js";
import type { Period } from "./vesting_pb.js";

/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 *
 * @generated from message cosmos.vesting.v1beta1.MsgCreateVestingAccount
 */
export declare class MsgCreateVestingAccount extends Message<MsgCreateVestingAccount> {
  /**
   * @generated from field: string from_address = 1;
   */
  fromAddress: string;

  /**
   * @generated from field: string to_address = 2;
   */
  toAddress: string;

  /**
   * @generated from field: repeated cosmos.base.v1beta1.Coin amount = 3;
   */
  amount: Coin[];

  /**
   * @generated from field: int64 end_time = 4;
   */
  endTime: bigint;

  /**
   * @generated from field: bool delayed = 5;
   */
  delayed: boolean;

  constructor(data?: PartialMessage<MsgCreateVestingAccount>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos.vesting.v1beta1.MsgCreateVestingAccount";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MsgCreateVestingAccount;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MsgCreateVestingAccount;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MsgCreateVestingAccount;

  static equals(a: MsgCreateVestingAccount | PlainMessage<MsgCreateVestingAccount> | undefined, b: MsgCreateVestingAccount | PlainMessage<MsgCreateVestingAccount> | undefined): boolean;
}

/**
 * MsgCreateVestingAccountResponse defines the Msg/CreateVestingAccount response type.
 *
 * @generated from message cosmos.vesting.v1beta1.MsgCreateVestingAccountResponse
 */
export declare class MsgCreateVestingAccountResponse extends Message<MsgCreateVestingAccountResponse> {
  constructor(data?: PartialMessage<MsgCreateVestingAccountResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos.vesting.v1beta1.MsgCreateVestingAccountResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MsgCreateVestingAccountResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MsgCreateVestingAccountResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MsgCreateVestingAccountResponse;

  static equals(a: MsgCreateVestingAccountResponse | PlainMessage<MsgCreateVestingAccountResponse> | undefined, b: MsgCreateVestingAccountResponse | PlainMessage<MsgCreateVestingAccountResponse> | undefined): boolean;
}

/**
 * MsgCreatePermanentLockedAccount defines a message that enables creating a permanent
 * locked account.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount
 */
export declare class MsgCreatePermanentLockedAccount extends Message<MsgCreatePermanentLockedAccount> {
  /**
   * @generated from field: string from_address = 1;
   */
  fromAddress: string;

  /**
   * @generated from field: string to_address = 2;
   */
  toAddress: string;

  /**
   * @generated from field: repeated cosmos.base.v1beta1.Coin amount = 3;
   */
  amount: Coin[];

  constructor(data?: PartialMessage<MsgCreatePermanentLockedAccount>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MsgCreatePermanentLockedAccount;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MsgCreatePermanentLockedAccount;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MsgCreatePermanentLockedAccount;

  static equals(a: MsgCreatePermanentLockedAccount | PlainMessage<MsgCreatePermanentLockedAccount> | undefined, b: MsgCreatePermanentLockedAccount | PlainMessage<MsgCreatePermanentLockedAccount> | undefined): boolean;
}

/**
 * MsgCreatePermanentLockedAccountResponse defines the Msg/CreatePermanentLockedAccount response type.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccountResponse
 */
export declare class MsgCreatePermanentLockedAccountResponse extends Message<MsgCreatePermanentLockedAccountResponse> {
  constructor(data?: PartialMessage<MsgCreatePermanentLockedAccountResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccountResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MsgCreatePermanentLockedAccountResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MsgCreatePermanentLockedAccountResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MsgCreatePermanentLockedAccountResponse;

  static equals(a: MsgCreatePermanentLockedAccountResponse | PlainMessage<MsgCreatePermanentLockedAccountResponse> | undefined, b: MsgCreatePermanentLockedAccountResponse | PlainMessage<MsgCreatePermanentLockedAccountResponse> | undefined): boolean;
}

/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount
 */
export declare class MsgCreatePeriodicVestingAccount extends Message<MsgCreatePeriodicVestingAccount> {
  /**
   * @generated from field: string from_address = 1;
   */
  fromAddress: string;

  /**
   * @generated from field: string to_address = 2;
   */
  toAddress: string;

  /**
   * @generated from field: int64 start_time = 3;
   */
  startTime: bigint;

  /**
   * @generated from field: repeated cosmos.vesting.v1beta1.Period vesting_periods = 4;
   */
  vestingPeriods: Period[];

  constructor(data?: PartialMessage<MsgCreatePeriodicVestingAccount>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MsgCreatePeriodicVestingAccount;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MsgCreatePeriodicVestingAccount;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MsgCreatePeriodicVestingAccount;

  static equals(a: MsgCreatePeriodicVestingAccount | PlainMessage<MsgCreatePeriodicVestingAccount> | undefined, b: MsgCreatePeriodicVestingAccount | PlainMessage<MsgCreatePeriodicVestingAccount> | undefined): boolean;
}

/**
 * MsgCreateVestingAccountResponse defines the Msg/CreatePeriodicVestingAccount
 * response type.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccountResponse
 */
export declare class MsgCreatePeriodicVestingAccountResponse extends Message<MsgCreatePeriodicVestingAccountResponse> {
  constructor(data?: PartialMessage<MsgCreatePeriodicVestingAccountResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccountResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MsgCreatePeriodicVestingAccountResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MsgCreatePeriodicVestingAccountResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MsgCreatePeriodicVestingAccountResponse;

  static equals(a: MsgCreatePeriodicVestingAccountResponse | PlainMessage<MsgCreatePeriodicVestingAccountResponse> | undefined, b: MsgCreatePeriodicVestingAccountResponse | PlainMessage<MsgCreatePeriodicVestingAccountResponse> | undefined): boolean;
}
