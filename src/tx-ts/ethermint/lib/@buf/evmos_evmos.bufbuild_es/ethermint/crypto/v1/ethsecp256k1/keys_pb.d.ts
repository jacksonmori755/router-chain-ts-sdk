// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/vesting/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/msg/v1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/bank/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file ethermint/crypto/v1/ethsecp256k1/keys.proto (package ethermint.crypto.v1.ethsecp256k1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * PubKey defines a type alias for an ecdsa.PublicKey that implements
 * Tendermint's PubKey interface. It represents the 33-byte compressed public
 * key format.
 *
 * @generated from message ethermint.crypto.v1.ethsecp256k1.PubKey
 */
export declare class PubKey extends Message<PubKey> {
  /**
   * key is the public key in byte form
   *
   * @generated from field: bytes key = 1;
   */
  key: Uint8Array;

  constructor(data?: PartialMessage<PubKey>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ethermint.crypto.v1.ethsecp256k1.PubKey";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PubKey;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PubKey;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PubKey;

  static equals(a: PubKey | PlainMessage<PubKey> | undefined, b: PubKey | PlainMessage<PubKey> | undefined): boolean;
}

/**
 * PrivKey defines a type alias for an ecdsa.PrivateKey that implements
 * Tendermint's PrivateKey interface.
 *
 * @generated from message ethermint.crypto.v1.ethsecp256k1.PrivKey
 */
export declare class PrivKey extends Message<PrivKey> {
  /**
   * key is the private key in byte form
   *
   * @generated from field: bytes key = 1;
   */
  key: Uint8Array;

  constructor(data?: PartialMessage<PrivKey>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ethermint.crypto.v1.ethsecp256k1.PrivKey";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PrivKey;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PrivKey;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PrivKey;

  static equals(a: PrivKey | PlainMessage<PrivKey> | undefined, b: PrivKey | PlainMessage<PrivKey> | undefined): boolean;
}

