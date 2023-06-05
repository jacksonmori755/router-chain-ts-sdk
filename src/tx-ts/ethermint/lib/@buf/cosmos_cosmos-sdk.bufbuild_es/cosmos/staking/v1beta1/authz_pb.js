// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/staking/v1beta1/authz.proto (package cosmos.staking.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { Coin } from "../../base/v1beta1/coin_pb.js";

/**
 * AuthorizationType defines the type of staking module authorization type
 *
 * Since: cosmos-sdk 0.43
 *
 * @generated from enum cosmos.staking.v1beta1.AuthorizationType
 */
export const AuthorizationType = proto3.makeEnum(
  "cosmos.staking.v1beta1.AuthorizationType",
  [
    {no: 0, name: "AUTHORIZATION_TYPE_UNSPECIFIED", localName: "UNSPECIFIED"},
    {no: 1, name: "AUTHORIZATION_TYPE_DELEGATE", localName: "DELEGATE"},
    {no: 2, name: "AUTHORIZATION_TYPE_UNDELEGATE", localName: "UNDELEGATE"},
    {no: 3, name: "AUTHORIZATION_TYPE_REDELEGATE", localName: "REDELEGATE"},
  ],
);

/**
 * StakeAuthorization defines authorization for delegate/undelegate/redelegate.
 *
 * Since: cosmos-sdk 0.43
 *
 * @generated from message cosmos.staking.v1beta1.StakeAuthorization
 */
export const StakeAuthorization = proto3.makeMessageType(
  "cosmos.staking.v1beta1.StakeAuthorization",
  () => [
    { no: 1, name: "max_tokens", kind: "message", T: Coin },
    { no: 2, name: "allow_list", kind: "message", T: StakeAuthorization_Validators, oneof: "validators" },
    { no: 3, name: "deny_list", kind: "message", T: StakeAuthorization_Validators, oneof: "validators" },
    { no: 4, name: "authorization_type", kind: "enum", T: proto3.getEnumType(AuthorizationType) },
  ],
);

/**
 * Validators defines list of validator addresses.
 *
 * @generated from message cosmos.staking.v1beta1.StakeAuthorization.Validators
 */
export const StakeAuthorization_Validators = proto3.makeMessageType(
  "cosmos.staking.v1beta1.StakeAuthorization.Validators",
  () => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ],
  {localName: "StakeAuthorization_Validators"},
);
