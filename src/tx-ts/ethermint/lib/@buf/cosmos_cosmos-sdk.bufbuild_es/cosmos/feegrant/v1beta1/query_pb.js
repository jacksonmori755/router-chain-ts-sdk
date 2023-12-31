// Since: cosmos-sdk 0.43

// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/feegrant/v1beta1/query.proto (package cosmos.feegrant.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { Grant } from "./feegrant_pb.js";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination_pb.js";

/**
 * QueryAllowanceRequest is the request type for the Query/Allowance RPC method.
 *
 * @generated from message cosmos.feegrant.v1beta1.QueryAllowanceRequest
 */
export const QueryAllowanceRequest = proto3.makeMessageType(
  "cosmos.feegrant.v1beta1.QueryAllowanceRequest",
  () => [
    { no: 1, name: "granter", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "grantee", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryAllowanceResponse is the response type for the Query/Allowance RPC method.
 *
 * @generated from message cosmos.feegrant.v1beta1.QueryAllowanceResponse
 */
export const QueryAllowanceResponse = proto3.makeMessageType(
  "cosmos.feegrant.v1beta1.QueryAllowanceResponse",
  () => [
    { no: 1, name: "allowance", kind: "message", T: Grant },
  ],
);

/**
 * QueryAllowancesRequest is the request type for the Query/Allowances RPC method.
 *
 * @generated from message cosmos.feegrant.v1beta1.QueryAllowancesRequest
 */
export const QueryAllowancesRequest = proto3.makeMessageType(
  "cosmos.feegrant.v1beta1.QueryAllowancesRequest",
  () => [
    { no: 1, name: "grantee", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryAllowancesResponse is the response type for the Query/Allowances RPC method.
 *
 * @generated from message cosmos.feegrant.v1beta1.QueryAllowancesResponse
 */
export const QueryAllowancesResponse = proto3.makeMessageType(
  "cosmos.feegrant.v1beta1.QueryAllowancesResponse",
  () => [
    { no: 1, name: "allowances", kind: "message", T: Grant, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

/**
 * QueryAllowancesByGranterRequest is the request type for the Query/AllowancesByGranter RPC method.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.feegrant.v1beta1.QueryAllowancesByGranterRequest
 */
export const QueryAllowancesByGranterRequest = proto3.makeMessageType(
  "cosmos.feegrant.v1beta1.QueryAllowancesByGranterRequest",
  () => [
    { no: 1, name: "granter", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryAllowancesByGranterResponse is the response type for the Query/AllowancesByGranter RPC method.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.feegrant.v1beta1.QueryAllowancesByGranterResponse
 */
export const QueryAllowancesByGranterResponse = proto3.makeMessageType(
  "cosmos.feegrant.v1beta1.QueryAllowancesByGranterResponse",
  () => [
    { no: 1, name: "allowances", kind: "message", T: Grant, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

