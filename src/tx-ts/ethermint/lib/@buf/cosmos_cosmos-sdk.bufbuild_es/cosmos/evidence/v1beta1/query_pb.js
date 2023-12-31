// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/evidence/v1beta1/query.proto (package cosmos.evidence.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination_pb.js";

/**
 * QueryEvidenceRequest is the request type for the Query/Evidence RPC method.
 *
 * @generated from message cosmos.evidence.v1beta1.QueryEvidenceRequest
 */
export const QueryEvidenceRequest = proto3.makeMessageType(
  "cosmos.evidence.v1beta1.QueryEvidenceRequest",
  () => [
    { no: 1, name: "evidence_hash", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "hash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryEvidenceResponse is the response type for the Query/Evidence RPC method.
 *
 * @generated from message cosmos.evidence.v1beta1.QueryEvidenceResponse
 */
export const QueryEvidenceResponse = proto3.makeMessageType(
  "cosmos.evidence.v1beta1.QueryEvidenceResponse",
  () => [
    { no: 1, name: "evidence", kind: "message", T: Any },
  ],
);

/**
 * QueryEvidenceRequest is the request type for the Query/AllEvidence RPC
 * method.
 *
 * @generated from message cosmos.evidence.v1beta1.QueryAllEvidenceRequest
 */
export const QueryAllEvidenceRequest = proto3.makeMessageType(
  "cosmos.evidence.v1beta1.QueryAllEvidenceRequest",
  () => [
    { no: 1, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryAllEvidenceResponse is the response type for the Query/AllEvidence RPC
 * method.
 *
 * @generated from message cosmos.evidence.v1beta1.QueryAllEvidenceResponse
 */
export const QueryAllEvidenceResponse = proto3.makeMessageType(
  "cosmos.evidence.v1beta1.QueryAllEvidenceResponse",
  () => [
    { no: 1, name: "evidence", kind: "message", T: Any, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

