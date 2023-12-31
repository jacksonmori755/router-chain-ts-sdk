// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./tendermint/version/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./tendermint/types/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./tendermint/crypto/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/upgrade/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/ics23/v1/**/*_pb.js:@buf/cosmos_ics23.bufbuild_es,rewrite_imports=./cosmos/base/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file ibc/applications/interchain_accounts/v1/packet.proto (package ibc.applications.interchain_accounts.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";

/**
 * Type defines a classification of message issued from a controller chain to its associated interchain accounts
 * host
 *
 * @generated from enum ibc.applications.interchain_accounts.v1.Type
 */
export const Type = proto3.makeEnum(
  "ibc.applications.interchain_accounts.v1.Type",
  [
    {no: 0, name: "TYPE_UNSPECIFIED", localName: "UNSPECIFIED"},
    {no: 1, name: "TYPE_EXECUTE_TX", localName: "EXECUTE_TX"},
  ],
);

/**
 * InterchainAccountPacketData is comprised of a raw transaction, type of transaction and optional memo field.
 *
 * @generated from message ibc.applications.interchain_accounts.v1.InterchainAccountPacketData
 */
export const InterchainAccountPacketData = proto3.makeMessageType(
  "ibc.applications.interchain_accounts.v1.InterchainAccountPacketData",
  () => [
    { no: 1, name: "type", kind: "enum", T: proto3.getEnumType(Type) },
    { no: 2, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "memo", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * CosmosTx contains a list of sdk.Msg's. It should be used when sending transactions to an SDK host chain.
 *
 * @generated from message ibc.applications.interchain_accounts.v1.CosmosTx
 */
export const CosmosTx = proto3.makeMessageType(
  "ibc.applications.interchain_accounts.v1.CosmosTx",
  () => [
    { no: 1, name: "messages", kind: "message", T: Any, repeated: true },
  ],
);

