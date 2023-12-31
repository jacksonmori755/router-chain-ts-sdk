// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/vesting/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/msg/v1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/bank/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file evmos/erc20/v1/events.proto (package evmos.erc20.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * EventRegisterPair is an event emitted when a coin is registered.
 *
 * @generated from message evmos.erc20.v1.EventRegisterPair
 */
export declare class EventRegisterPair extends Message<EventRegisterPair> {
  /**
   * denom is the coin's denomination.
   *
   * @generated from field: string denom = 1;
   */
  denom: string;

  /**
   * erc20_address is the ERC20 contract address.
   *
   * @generated from field: string erc20_address = 2;
   */
  erc20Address: string;

  constructor(data?: PartialMessage<EventRegisterPair>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "evmos.erc20.v1.EventRegisterPair";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EventRegisterPair;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EventRegisterPair;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EventRegisterPair;

  static equals(a: EventRegisterPair | PlainMessage<EventRegisterPair> | undefined, b: EventRegisterPair | PlainMessage<EventRegisterPair> | undefined): boolean;
}

/**
 * EventToggleTokenConversion is an event emitted when a coin's token conversion is toggled.
 *
 * @generated from message evmos.erc20.v1.EventToggleTokenConversion
 */
export declare class EventToggleTokenConversion extends Message<EventToggleTokenConversion> {
  /**
   * denom is the coin's denomination.
   *
   * @generated from field: string denom = 1;
   */
  denom: string;

  /**
   * erc20_address is the ERC20 contract address.
   *
   * @generated from field: string erc20_address = 2;
   */
  erc20Address: string;

  constructor(data?: PartialMessage<EventToggleTokenConversion>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "evmos.erc20.v1.EventToggleTokenConversion";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EventToggleTokenConversion;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EventToggleTokenConversion;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EventToggleTokenConversion;

  static equals(a: EventToggleTokenConversion | PlainMessage<EventToggleTokenConversion> | undefined, b: EventToggleTokenConversion | PlainMessage<EventToggleTokenConversion> | undefined): boolean;
}

/**
 * EventConvertCoin is an event emitted when a coin is converted.
 *
 * @generated from message evmos.erc20.v1.EventConvertCoin
 */
export declare class EventConvertCoin extends Message<EventConvertCoin> {
  /**
   * sender is the sender's address.
   *
   * @generated from field: string sender = 1;
   */
  sender: string;

  /**
   * receiver is the receiver's address.
   *
   * @generated from field: string receiver = 2;
   */
  receiver: string;

  /**
   * amount is the amount of coins to be converted.
   *
   * @generated from field: string amount = 3;
   */
  amount: string;

  /**
   * denom is the coin's denomination.
   *
   * @generated from field: string denom = 4;
   */
  denom: string;

  /**
   * erc20_address is the ERC20 contract address.
   *
   * @generated from field: string erc20_address = 5;
   */
  erc20Address: string;

  constructor(data?: PartialMessage<EventConvertCoin>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "evmos.erc20.v1.EventConvertCoin";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EventConvertCoin;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EventConvertCoin;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EventConvertCoin;

  static equals(a: EventConvertCoin | PlainMessage<EventConvertCoin> | undefined, b: EventConvertCoin | PlainMessage<EventConvertCoin> | undefined): boolean;
}

/**
 * EventConvertERC20 is an event emitted when an ERC20 is converted.
 *
 * @generated from message evmos.erc20.v1.EventConvertERC20
 */
export declare class EventConvertERC20 extends Message<EventConvertERC20> {
  /**
   * sender is the sender's address.
   *
   * @generated from field: string sender = 1;
   */
  sender: string;

  /**
   * receiver is the receiver's address.
   *
   * @generated from field: string receiver = 2;
   */
  receiver: string;

  /**
   * amount is the amount of coins to be converted.
   *
   * @generated from field: string amount = 3;
   */
  amount: string;

  /**
   * denom is the coin's denomination.
   *
   * @generated from field: string denom = 4;
   */
  denom: string;

  /**
   * contract_address of an ERC20 token contract, that is registered in a token pair
   *
   * @generated from field: string contract_address = 5;
   */
  contractAddress: string;

  constructor(data?: PartialMessage<EventConvertERC20>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "evmos.erc20.v1.EventConvertERC20";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EventConvertERC20;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EventConvertERC20;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EventConvertERC20;

  static equals(a: EventConvertERC20 | PlainMessage<EventConvertERC20> | undefined, b: EventConvertERC20 | PlainMessage<EventConvertERC20> | undefined): boolean;
}

