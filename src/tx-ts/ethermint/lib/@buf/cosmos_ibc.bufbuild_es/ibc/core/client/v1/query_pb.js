// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./tendermint/version/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./tendermint/types/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./tendermint/crypto/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/upgrade/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/ics23/v1/**/*_pb.js:@buf/cosmos_ics23.bufbuild_es,rewrite_imports=./cosmos/base/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file ibc/core/client/v1/query.proto (package ibc.core.client.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";
import { ConsensusStateWithHeight, Height, IdentifiedClientState, Params } from "./client_pb.js";
import { PageRequest, PageResponse } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/query/v1beta1/pagination_pb.js";

/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 *
 * @generated from message ibc.core.client.v1.QueryClientStateRequest
 */
export const QueryClientStateRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryClientStateRequest",
  () => [
    { no: 1, name: "client_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 *
 * @generated from message ibc.core.client.v1.QueryClientStateResponse
 */
export const QueryClientStateResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryClientStateResponse",
  () => [
    { no: 1, name: "client_state", kind: "message", T: Any },
    { no: 2, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "proof_height", kind: "message", T: Height },
  ],
);

/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 *
 * @generated from message ibc.core.client.v1.QueryClientStatesRequest
 */
export const QueryClientStatesRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryClientStatesRequest",
  () => [
    { no: 1, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 *
 * @generated from message ibc.core.client.v1.QueryClientStatesResponse
 */
export const QueryClientStatesResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryClientStatesResponse",
  () => [
    { no: 1, name: "client_states", kind: "message", T: IdentifiedClientState, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 *
 * @generated from message ibc.core.client.v1.QueryConsensusStateRequest
 */
export const QueryConsensusStateRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryConsensusStateRequest",
  () => [
    { no: 1, name: "client_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "revision_number", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "revision_height", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "latest_height", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 *
 * @generated from message ibc.core.client.v1.QueryConsensusStateResponse
 */
export const QueryConsensusStateResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryConsensusStateResponse",
  () => [
    { no: 1, name: "consensus_state", kind: "message", T: Any },
    { no: 2, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "proof_height", kind: "message", T: Height },
  ],
);

/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 *
 * @generated from message ibc.core.client.v1.QueryConsensusStatesRequest
 */
export const QueryConsensusStatesRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryConsensusStatesRequest",
  () => [
    { no: 1, name: "client_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 *
 * @generated from message ibc.core.client.v1.QueryConsensusStatesResponse
 */
export const QueryConsensusStatesResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryConsensusStatesResponse",
  () => [
    { no: 1, name: "consensus_states", kind: "message", T: ConsensusStateWithHeight, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

/**
 * QueryConsensusStateHeightsRequest is the request type for Query/ConsensusStateHeights
 * RPC method.
 *
 * @generated from message ibc.core.client.v1.QueryConsensusStateHeightsRequest
 */
export const QueryConsensusStateHeightsRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryConsensusStateHeightsRequest",
  () => [
    { no: 1, name: "client_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 *
 * @generated from message ibc.core.client.v1.QueryConsensusStateHeightsResponse
 */
export const QueryConsensusStateHeightsResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryConsensusStateHeightsResponse",
  () => [
    { no: 1, name: "consensus_state_heights", kind: "message", T: Height, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 *
 * @generated from message ibc.core.client.v1.QueryClientStatusRequest
 */
export const QueryClientStatusRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryClientStatusRequest",
  () => [
    { no: 1, name: "client_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 *
 * @generated from message ibc.core.client.v1.QueryClientStatusResponse
 */
export const QueryClientStatusResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryClientStatusResponse",
  () => [
    { no: 1, name: "status", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 *
 * @generated from message ibc.core.client.v1.QueryClientParamsRequest
 */
export const QueryClientParamsRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryClientParamsRequest",
  [],
);

/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 *
 * @generated from message ibc.core.client.v1.QueryClientParamsResponse
 */
export const QueryClientParamsResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryClientParamsResponse",
  () => [
    { no: 1, name: "params", kind: "message", T: Params },
  ],
);

/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 *
 * @generated from message ibc.core.client.v1.QueryUpgradedClientStateRequest
 */
export const QueryUpgradedClientStateRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryUpgradedClientStateRequest",
  [],
);

/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 *
 * @generated from message ibc.core.client.v1.QueryUpgradedClientStateResponse
 */
export const QueryUpgradedClientStateResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryUpgradedClientStateResponse",
  () => [
    { no: 1, name: "upgraded_client_state", kind: "message", T: Any },
  ],
);

/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 *
 * @generated from message ibc.core.client.v1.QueryUpgradedConsensusStateRequest
 */
export const QueryUpgradedConsensusStateRequest = proto3.makeMessageType(
  "ibc.core.client.v1.QueryUpgradedConsensusStateRequest",
  [],
);

/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 *
 * @generated from message ibc.core.client.v1.QueryUpgradedConsensusStateResponse
 */
export const QueryUpgradedConsensusStateResponse = proto3.makeMessageType(
  "ibc.core.client.v1.QueryUpgradedConsensusStateResponse",
  () => [
    { no: 1, name: "upgraded_consensus_state", kind: "message", T: Any },
  ],
);

