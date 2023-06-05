// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/vesting/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/msg/v1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/bank/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file evmos/revenue/v1/genesis.proto (package evmos.revenue.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { Revenue } from "./revenue_pb.js";

/**
 * GenesisState defines the module's genesis state.
 *
 * @generated from message evmos.revenue.v1.GenesisState
 */
export const GenesisState = proto3.makeMessageType(
  "evmos.revenue.v1.GenesisState",
  () => [
    { no: 1, name: "params", kind: "message", T: Params },
    { no: 2, name: "revenues", kind: "message", T: Revenue, repeated: true },
  ],
);

/**
 * Params defines the revenue module params
 *
 * @generated from message evmos.revenue.v1.Params
 */
export const Params = proto3.makeMessageType(
  "evmos.revenue.v1.Params",
  () => [
    { no: 1, name: "enable_revenue", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "developer_shares", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "addr_derivation_cost_create", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);
