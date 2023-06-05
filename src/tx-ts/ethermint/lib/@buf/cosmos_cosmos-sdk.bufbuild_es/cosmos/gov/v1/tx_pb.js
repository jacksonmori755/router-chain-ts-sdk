// Since: cosmos-sdk 0.46

// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/gov/v1/tx.proto (package cosmos.gov.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";
import { Coin } from "../../base/v1beta1/coin_pb.js";
import { Params, VoteOption, WeightedVoteOption } from "./gov_pb.js";

/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 *
 * @generated from message cosmos.gov.v1.MsgSubmitProposal
 */
export const MsgSubmitProposal = proto3.makeMessageType(
  "cosmos.gov.v1.MsgSubmitProposal",
  () => [
    { no: 1, name: "messages", kind: "message", T: Any, repeated: true },
    { no: 2, name: "initial_deposit", kind: "message", T: Coin, repeated: true },
    { no: 3, name: "proposer", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "metadata", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * MsgSubmitProposalResponse defines the Msg/SubmitProposal response type.
 *
 * @generated from message cosmos.gov.v1.MsgSubmitProposalResponse
 */
export const MsgSubmitProposalResponse = proto3.makeMessageType(
  "cosmos.gov.v1.MsgSubmitProposalResponse",
  () => [
    { no: 1, name: "proposal_id", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * MsgExecLegacyContent is used to wrap the legacy content field into a message.
 * This ensures backwards compatibility with v1beta1.MsgSubmitProposal.
 *
 * @generated from message cosmos.gov.v1.MsgExecLegacyContent
 */
export const MsgExecLegacyContent = proto3.makeMessageType(
  "cosmos.gov.v1.MsgExecLegacyContent",
  () => [
    { no: 1, name: "content", kind: "message", T: Any },
    { no: 2, name: "authority", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * MsgExecLegacyContentResponse defines the Msg/ExecLegacyContent response type.
 *
 * @generated from message cosmos.gov.v1.MsgExecLegacyContentResponse
 */
export const MsgExecLegacyContentResponse = proto3.makeMessageType(
  "cosmos.gov.v1.MsgExecLegacyContentResponse",
  [],
);

/**
 * MsgVote defines a message to cast a vote.
 *
 * @generated from message cosmos.gov.v1.MsgVote
 */
export const MsgVote = proto3.makeMessageType(
  "cosmos.gov.v1.MsgVote",
  () => [
    { no: 1, name: "proposal_id", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "voter", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "option", kind: "enum", T: proto3.getEnumType(VoteOption) },
    { no: 4, name: "metadata", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * MsgVoteResponse defines the Msg/Vote response type.
 *
 * @generated from message cosmos.gov.v1.MsgVoteResponse
 */
export const MsgVoteResponse = proto3.makeMessageType(
  "cosmos.gov.v1.MsgVoteResponse",
  [],
);

/**
 * MsgVoteWeighted defines a message to cast a vote.
 *
 * @generated from message cosmos.gov.v1.MsgVoteWeighted
 */
export const MsgVoteWeighted = proto3.makeMessageType(
  "cosmos.gov.v1.MsgVoteWeighted",
  () => [
    { no: 1, name: "proposal_id", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "voter", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "options", kind: "message", T: WeightedVoteOption, repeated: true },
    { no: 4, name: "metadata", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * MsgVoteWeightedResponse defines the Msg/VoteWeighted response type.
 *
 * @generated from message cosmos.gov.v1.MsgVoteWeightedResponse
 */
export const MsgVoteWeightedResponse = proto3.makeMessageType(
  "cosmos.gov.v1.MsgVoteWeightedResponse",
  [],
);

/**
 * MsgDeposit defines a message to submit a deposit to an existing proposal.
 *
 * @generated from message cosmos.gov.v1.MsgDeposit
 */
export const MsgDeposit = proto3.makeMessageType(
  "cosmos.gov.v1.MsgDeposit",
  () => [
    { no: 1, name: "proposal_id", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "depositor", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "amount", kind: "message", T: Coin, repeated: true },
  ],
);

/**
 * MsgDepositResponse defines the Msg/Deposit response type.
 *
 * @generated from message cosmos.gov.v1.MsgDepositResponse
 */
export const MsgDepositResponse = proto3.makeMessageType(
  "cosmos.gov.v1.MsgDepositResponse",
  [],
);

/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 *
 * @generated from message cosmos.gov.v1.MsgUpdateParams
 */
export const MsgUpdateParams = proto3.makeMessageType(
  "cosmos.gov.v1.MsgUpdateParams",
  () => [
    { no: 1, name: "authority", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "params", kind: "message", T: Params },
  ],
);

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 *
 * @generated from message cosmos.gov.v1.MsgUpdateParamsResponse
 */
export const MsgUpdateParamsResponse = proto3.makeMessageType(
  "cosmos.gov.v1.MsgUpdateParamsResponse",
  [],
);
