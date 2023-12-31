// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/msg/v1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file ethermint/types/v1/dynamic_fee.proto (package ethermint.types.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * ExtensionOptionDynamicFeeTx is an extension option that specifies the maxPrioPrice for cosmos tx
 *
 * @generated from message ethermint.types.v1.ExtensionOptionDynamicFeeTx
 */
export declare class ExtensionOptionDynamicFeeTx extends Message<ExtensionOptionDynamicFeeTx> {
  /**
   * max_priority_price is the same as `max_priority_fee_per_gas` in eip-1559 spec
   *
   * @generated from field: string max_priority_price = 1;
   */
  maxPriorityPrice: string;

  constructor(data?: PartialMessage<ExtensionOptionDynamicFeeTx>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ethermint.types.v1.ExtensionOptionDynamicFeeTx";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExtensionOptionDynamicFeeTx;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExtensionOptionDynamicFeeTx;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExtensionOptionDynamicFeeTx;

  static equals(a: ExtensionOptionDynamicFeeTx | PlainMessage<ExtensionOptionDynamicFeeTx> | undefined, b: ExtensionOptionDynamicFeeTx | PlainMessage<ExtensionOptionDynamicFeeTx> | undefined): boolean;
}

