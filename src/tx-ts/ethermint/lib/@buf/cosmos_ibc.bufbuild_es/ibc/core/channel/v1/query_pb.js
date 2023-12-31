// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./tendermint/version/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./tendermint/types/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./tendermint/crypto/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/upgrade/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/ics23/v1/**/*_pb.js:@buf/cosmos_ics23.bufbuild_es,rewrite_imports=./cosmos/base/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file ibc/core/channel/v1/query.proto (package ibc.core.channel.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";
import { Channel, IdentifiedChannel, PacketState } from "./channel_pb.js";
import { Height, IdentifiedClientState } from "../../client/v1/client_pb.js";
import { PageRequest, PageResponse } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/query/v1beta1/pagination_pb.js";

/**
 * QueryChannelRequest is the request type for the Query/Channel RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryChannelRequest
 */
export const QueryChannelRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryChannelRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryChannelResponse is the response type for the Query/Channel RPC method.
 * Besides the Channel end, it includes a proof and the height from which the
 * proof was retrieved.
 *
 * @generated from message ibc.core.channel.v1.QueryChannelResponse
 */
export const QueryChannelResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryChannelResponse",
  () => [
    { no: 1, name: "channel", kind: "message", T: Channel },
    { no: 2, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "proof_height", kind: "message", T: Height },
  ],
);

/**
 * QueryChannelsRequest is the request type for the Query/Channels RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryChannelsRequest
 */
export const QueryChannelsRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryChannelsRequest",
  () => [
    { no: 1, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryChannelsResponse is the response type for the Query/Channels RPC method.
 *
 * @generated from message ibc.core.channel.v1.QueryChannelsResponse
 */
export const QueryChannelsResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryChannelsResponse",
  () => [
    { no: 1, name: "channels", kind: "message", T: IdentifiedChannel, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
    { no: 3, name: "height", kind: "message", T: Height },
  ],
);

/**
 * QueryConnectionChannelsRequest is the request type for the
 * Query/QueryConnectionChannels RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryConnectionChannelsRequest
 */
export const QueryConnectionChannelsRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryConnectionChannelsRequest",
  () => [
    { no: 1, name: "connection", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryConnectionChannelsResponse is the Response type for the
 * Query/QueryConnectionChannels RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryConnectionChannelsResponse
 */
export const QueryConnectionChannelsResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryConnectionChannelsResponse",
  () => [
    { no: 1, name: "channels", kind: "message", T: IdentifiedChannel, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
    { no: 3, name: "height", kind: "message", T: Height },
  ],
);

/**
 * QueryChannelClientStateRequest is the request type for the Query/ClientState
 * RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryChannelClientStateRequest
 */
export const QueryChannelClientStateRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryChannelClientStateRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryChannelClientStateResponse
 */
export const QueryChannelClientStateResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryChannelClientStateResponse",
  () => [
    { no: 1, name: "identified_client_state", kind: "message", T: IdentifiedClientState },
    { no: 2, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "proof_height", kind: "message", T: Height },
  ],
);

/**
 * QueryChannelConsensusStateRequest is the request type for the
 * Query/ConsensusState RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryChannelConsensusStateRequest
 */
export const QueryChannelConsensusStateRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryChannelConsensusStateRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "revision_number", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "revision_height", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryChannelConsensusStateResponse
 */
export const QueryChannelConsensusStateResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryChannelConsensusStateResponse",
  () => [
    { no: 1, name: "consensus_state", kind: "message", T: Any },
    { no: 2, name: "client_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "proof_height", kind: "message", T: Height },
  ],
);

/**
 * QueryPacketCommitmentRequest is the request type for the
 * Query/PacketCommitment RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryPacketCommitmentRequest
 */
export const QueryPacketCommitmentRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketCommitmentRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "sequence", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * QueryPacketCommitmentResponse defines the client query response for a packet
 * which also includes a proof and the height from which the proof was
 * retrieved
 *
 * @generated from message ibc.core.channel.v1.QueryPacketCommitmentResponse
 */
export const QueryPacketCommitmentResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketCommitmentResponse",
  () => [
    { no: 1, name: "commitment", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "proof_height", kind: "message", T: Height },
  ],
);

/**
 * QueryPacketCommitmentsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryPacketCommitmentsRequest
 */
export const QueryPacketCommitmentsRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketCommitmentsRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryPacketCommitmentsResponse is the request type for the
 * Query/QueryPacketCommitments RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryPacketCommitmentsResponse
 */
export const QueryPacketCommitmentsResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketCommitmentsResponse",
  () => [
    { no: 1, name: "commitments", kind: "message", T: PacketState, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
    { no: 3, name: "height", kind: "message", T: Height },
  ],
);

/**
 * QueryPacketReceiptRequest is the request type for the
 * Query/PacketReceipt RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryPacketReceiptRequest
 */
export const QueryPacketReceiptRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketReceiptRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "sequence", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * QueryPacketReceiptResponse defines the client query response for a packet
 * receipt which also includes a proof, and the height from which the proof was
 * retrieved
 *
 * @generated from message ibc.core.channel.v1.QueryPacketReceiptResponse
 */
export const QueryPacketReceiptResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketReceiptResponse",
  () => [
    { no: 2, name: "received", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "proof_height", kind: "message", T: Height },
  ],
);

/**
 * QueryPacketAcknowledgementRequest is the request type for the
 * Query/PacketAcknowledgement RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryPacketAcknowledgementRequest
 */
export const QueryPacketAcknowledgementRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketAcknowledgementRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "sequence", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * QueryPacketAcknowledgementResponse defines the client query response for a
 * packet which also includes a proof and the height from which the
 * proof was retrieved
 *
 * @generated from message ibc.core.channel.v1.QueryPacketAcknowledgementResponse
 */
export const QueryPacketAcknowledgementResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketAcknowledgementResponse",
  () => [
    { no: 1, name: "acknowledgement", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "proof_height", kind: "message", T: Height },
  ],
);

/**
 * QueryPacketAcknowledgementsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryPacketAcknowledgementsRequest
 */
export const QueryPacketAcknowledgementsRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketAcknowledgementsRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "pagination", kind: "message", T: PageRequest },
    { no: 4, name: "packet_commitment_sequences", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ],
);

/**
 * QueryPacketAcknowledgemetsResponse is the request type for the
 * Query/QueryPacketAcknowledgements RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryPacketAcknowledgementsResponse
 */
export const QueryPacketAcknowledgementsResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryPacketAcknowledgementsResponse",
  () => [
    { no: 1, name: "acknowledgements", kind: "message", T: PacketState, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
    { no: 3, name: "height", kind: "message", T: Height },
  ],
);

/**
 * QueryUnreceivedPacketsRequest is the request type for the
 * Query/UnreceivedPackets RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryUnreceivedPacketsRequest
 */
export const QueryUnreceivedPacketsRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryUnreceivedPacketsRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "packet_commitment_sequences", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ],
);

/**
 * QueryUnreceivedPacketsResponse is the response type for the
 * Query/UnreceivedPacketCommitments RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryUnreceivedPacketsResponse
 */
export const QueryUnreceivedPacketsResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryUnreceivedPacketsResponse",
  () => [
    { no: 1, name: "sequences", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
    { no: 2, name: "height", kind: "message", T: Height },
  ],
);

/**
 * QueryUnreceivedAcks is the request type for the
 * Query/UnreceivedAcks RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryUnreceivedAcksRequest
 */
export const QueryUnreceivedAcksRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryUnreceivedAcksRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "packet_ack_sequences", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ],
);

/**
 * QueryUnreceivedAcksResponse is the response type for the
 * Query/UnreceivedAcks RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryUnreceivedAcksResponse
 */
export const QueryUnreceivedAcksResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryUnreceivedAcksResponse",
  () => [
    { no: 1, name: "sequences", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
    { no: 2, name: "height", kind: "message", T: Height },
  ],
);

/**
 * QueryNextSequenceReceiveRequest is the request type for the
 * Query/QueryNextSequenceReceiveRequest RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryNextSequenceReceiveRequest
 */
export const QueryNextSequenceReceiveRequest = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryNextSequenceReceiveRequest",
  () => [
    { no: 1, name: "port_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QuerySequenceResponse is the request type for the
 * Query/QueryNextSequenceReceiveResponse RPC method
 *
 * @generated from message ibc.core.channel.v1.QueryNextSequenceReceiveResponse
 */
export const QueryNextSequenceReceiveResponse = proto3.makeMessageType(
  "ibc.core.channel.v1.QueryNextSequenceReceiveResponse",
  () => [
    { no: 1, name: "next_sequence_receive", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "proof", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "proof_height", kind: "message", T: Height },
  ],
);

