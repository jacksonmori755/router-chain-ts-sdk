// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./tendermint/version/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./tendermint/types/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./tendermint/crypto/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/upgrade/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/ics23/v1/**/*_pb.js:@buf/cosmos_ics23.bufbuild_es,rewrite_imports=./cosmos/base/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file ibc/applications/transfer/v1/tx.proto (package ibc.applications.transfer.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { Coin } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb.js";
import { Height } from "../../../core/client/v1/client_pb.js";

/**
 * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
 * ICS20 enabled chains. See ICS Spec here:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#data-structures
 *
 * @generated from message ibc.applications.transfer.v1.MsgTransfer
 */
export const MsgTransfer = proto3.makeMessageType(
  "ibc.applications.transfer.v1.MsgTransfer",
  () => [
    { no: 1, name: "source_port", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "source_channel", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "token", kind: "message", T: Coin },
    { no: 4, name: "sender", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "receiver", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "timeout_height", kind: "message", T: Height },
    { no: 7, name: "timeout_timestamp", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 8, name: "memo", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * MsgTransferResponse defines the Msg/Transfer response type.
 *
 * @generated from message ibc.applications.transfer.v1.MsgTransferResponse
 */
export const MsgTransferResponse = proto3.makeMessageType(
  "ibc.applications.transfer.v1.MsgTransferResponse",
  () => [
    { no: 1, name: "sequence", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

