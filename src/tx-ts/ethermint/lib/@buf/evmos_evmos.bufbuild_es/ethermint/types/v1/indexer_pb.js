// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/vesting/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/msg/v1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/bank/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file ethermint/types/v1/indexer.proto (package ethermint.types.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * TxResult is the value stored in eth tx indexer
 *
 * @generated from message ethermint.types.v1.TxResult
 */
export const TxResult = proto3.makeMessageType(
  "ethermint.types.v1.TxResult",
  () => [
    { no: 1, name: "height", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "tx_index", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "msg_index", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "eth_tx_index", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "failed", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "gas_used", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 7, name: "cumulative_gas_used", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

