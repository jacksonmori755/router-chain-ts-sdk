// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/distribution/v1beta1/query.proto (package cosmos.distribution.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { DelegationDelegatorReward, Params, ValidatorAccumulatedCommission, ValidatorOutstandingRewards, ValidatorSlashEvent } from "./distribution_pb.js";
import { DecCoin } from "../../base/v1beta1/coin_pb.js";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination_pb.js";

/**
 * QueryParamsRequest is the request type for the Query/Params RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryParamsRequest
 */
export const QueryParamsRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryParamsRequest",
  [],
);

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryParamsResponse
 */
export const QueryParamsResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryParamsResponse",
  () => [
    { no: 1, name: "params", kind: "message", T: Params },
  ],
);

/**
 * QueryValidatorDistributionInfoRequest is the request type for the Query/ValidatorDistributionInfo RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryValidatorDistributionInfoRequest
 */
export const QueryValidatorDistributionInfoRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryValidatorDistributionInfoRequest",
  () => [
    { no: 1, name: "validator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryValidatorDistributionInfoResponse is the response type for the Query/ValidatorDistributionInfo RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryValidatorDistributionInfoResponse
 */
export const QueryValidatorDistributionInfoResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryValidatorDistributionInfoResponse",
  () => [
    { no: 1, name: "operator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "self_bond_rewards", kind: "message", T: DecCoin, repeated: true },
    { no: 3, name: "commission", kind: "message", T: DecCoin, repeated: true },
  ],
);

/**
 * QueryValidatorOutstandingRewardsRequest is the request type for the
 * Query/ValidatorOutstandingRewards RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsRequest
 */
export const QueryValidatorOutstandingRewardsRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsRequest",
  () => [
    { no: 1, name: "validator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryValidatorOutstandingRewardsResponse is the response type for the
 * Query/ValidatorOutstandingRewards RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsResponse
 */
export const QueryValidatorOutstandingRewardsResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsResponse",
  () => [
    { no: 1, name: "rewards", kind: "message", T: ValidatorOutstandingRewards },
  ],
);

/**
 * QueryValidatorCommissionRequest is the request type for the
 * Query/ValidatorCommission RPC method
 *
 * @generated from message cosmos.distribution.v1beta1.QueryValidatorCommissionRequest
 */
export const QueryValidatorCommissionRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryValidatorCommissionRequest",
  () => [
    { no: 1, name: "validator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryValidatorCommissionResponse is the response type for the
 * Query/ValidatorCommission RPC method
 *
 * @generated from message cosmos.distribution.v1beta1.QueryValidatorCommissionResponse
 */
export const QueryValidatorCommissionResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryValidatorCommissionResponse",
  () => [
    { no: 1, name: "commission", kind: "message", T: ValidatorAccumulatedCommission },
  ],
);

/**
 * QueryValidatorSlashesRequest is the request type for the
 * Query/ValidatorSlashes RPC method
 *
 * @generated from message cosmos.distribution.v1beta1.QueryValidatorSlashesRequest
 */
export const QueryValidatorSlashesRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryValidatorSlashesRequest",
  () => [
    { no: 1, name: "validator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "starting_height", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "ending_height", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryValidatorSlashesResponse is the response type for the
 * Query/ValidatorSlashes RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryValidatorSlashesResponse
 */
export const QueryValidatorSlashesResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryValidatorSlashesResponse",
  () => [
    { no: 1, name: "slashes", kind: "message", T: ValidatorSlashEvent, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

/**
 * QueryDelegationRewardsRequest is the request type for the
 * Query/DelegationRewards RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryDelegationRewardsRequest
 */
export const QueryDelegationRewardsRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryDelegationRewardsRequest",
  () => [
    { no: 1, name: "delegator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "validator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryDelegationRewardsResponse is the response type for the
 * Query/DelegationRewards RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryDelegationRewardsResponse
 */
export const QueryDelegationRewardsResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryDelegationRewardsResponse",
  () => [
    { no: 1, name: "rewards", kind: "message", T: DecCoin, repeated: true },
  ],
);

/**
 * QueryDelegationTotalRewardsRequest is the request type for the
 * Query/DelegationTotalRewards RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryDelegationTotalRewardsRequest
 */
export const QueryDelegationTotalRewardsRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryDelegationTotalRewardsRequest",
  () => [
    { no: 1, name: "delegator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryDelegationTotalRewardsResponse is the response type for the
 * Query/DelegationTotalRewards RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryDelegationTotalRewardsResponse
 */
export const QueryDelegationTotalRewardsResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryDelegationTotalRewardsResponse",
  () => [
    { no: 1, name: "rewards", kind: "message", T: DelegationDelegatorReward, repeated: true },
    { no: 2, name: "total", kind: "message", T: DecCoin, repeated: true },
  ],
);

/**
 * QueryDelegatorValidatorsRequest is the request type for the
 * Query/DelegatorValidators RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryDelegatorValidatorsRequest
 */
export const QueryDelegatorValidatorsRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryDelegatorValidatorsRequest",
  () => [
    { no: 1, name: "delegator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryDelegatorValidatorsResponse is the response type for the
 * Query/DelegatorValidators RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryDelegatorValidatorsResponse
 */
export const QueryDelegatorValidatorsResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryDelegatorValidatorsResponse",
  () => [
    { no: 1, name: "validators", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ],
);

/**
 * QueryDelegatorWithdrawAddressRequest is the request type for the
 * Query/DelegatorWithdrawAddress RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressRequest
 */
export const QueryDelegatorWithdrawAddressRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressRequest",
  () => [
    { no: 1, name: "delegator_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryDelegatorWithdrawAddressResponse is the response type for the
 * Query/DelegatorWithdrawAddress RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressResponse
 */
export const QueryDelegatorWithdrawAddressResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressResponse",
  () => [
    { no: 1, name: "withdraw_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryCommunityPoolRequest is the request type for the Query/CommunityPool RPC
 * method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryCommunityPoolRequest
 */
export const QueryCommunityPoolRequest = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryCommunityPoolRequest",
  [],
);

/**
 * QueryCommunityPoolResponse is the response type for the Query/CommunityPool
 * RPC method.
 *
 * @generated from message cosmos.distribution.v1beta1.QueryCommunityPoolResponse
 */
export const QueryCommunityPoolResponse = proto3.makeMessageType(
  "cosmos.distribution.v1beta1.QueryCommunityPoolResponse",
  () => [
    { no: 1, name: "pool", kind: "message", T: DecCoin, repeated: true },
  ],
);

