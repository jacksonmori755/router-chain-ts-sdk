// Since: cosmos-sdk 0.46

// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/group/v1/genesis.proto (package cosmos.group.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { GroupInfo, GroupMember, GroupPolicyInfo, Proposal, Vote } from "./types_pb.js";

/**
 * GenesisState defines the group module's genesis state.
 *
 * @generated from message cosmos.group.v1.GenesisState
 */
export const GenesisState = proto3.makeMessageType(
  "cosmos.group.v1.GenesisState",
  () => [
    { no: 1, name: "group_seq", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "groups", kind: "message", T: GroupInfo, repeated: true },
    { no: 3, name: "group_members", kind: "message", T: GroupMember, repeated: true },
    { no: 4, name: "group_policy_seq", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "group_policies", kind: "message", T: GroupPolicyInfo, repeated: true },
    { no: 6, name: "proposal_seq", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 7, name: "proposals", kind: "message", T: Proposal, repeated: true },
    { no: 8, name: "votes", kind: "message", T: Vote, repeated: true },
  ],
);

