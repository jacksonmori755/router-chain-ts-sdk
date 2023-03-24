// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/autocli/v1/query.proto (package cosmos.autocli.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { ModuleOptions } from "./options_pb.js";

/**
 * AppOptionsRequest is the RemoteInfoService/AppOptions request type.
 *
 * @generated from message cosmos.autocli.v1.AppOptionsRequest
 */
export declare class AppOptionsRequest extends Message<AppOptionsRequest> {
  constructor(data?: PartialMessage<AppOptionsRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos.autocli.v1.AppOptionsRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AppOptionsRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AppOptionsRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AppOptionsRequest;

  static equals(a: AppOptionsRequest | PlainMessage<AppOptionsRequest> | undefined, b: AppOptionsRequest | PlainMessage<AppOptionsRequest> | undefined): boolean;
}

/**
 * AppOptionsResponse is the RemoteInfoService/AppOptions response type.
 *
 * @generated from message cosmos.autocli.v1.AppOptionsResponse
 */
export declare class AppOptionsResponse extends Message<AppOptionsResponse> {
  /**
   * module_options is a map of module name to autocli module options.
   *
   * @generated from field: map<string, cosmos.autocli.v1.ModuleOptions> module_options = 1;
   */
  moduleOptions: { [key: string]: ModuleOptions };

  constructor(data?: PartialMessage<AppOptionsResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos.autocli.v1.AppOptionsResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AppOptionsResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AppOptionsResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AppOptionsResponse;

  static equals(a: AppOptionsResponse | PlainMessage<AppOptionsResponse> | undefined, b: AppOptionsResponse | PlainMessage<AppOptionsResponse> | undefined): boolean;
}

