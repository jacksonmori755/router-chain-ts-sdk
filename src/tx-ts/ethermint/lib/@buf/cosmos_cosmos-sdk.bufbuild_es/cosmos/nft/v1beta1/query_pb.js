// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/nft/v1beta1/query.proto (package cosmos.nft.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination_pb.js";
import { Class, NFT } from "./nft_pb.js";

/**
 * QueryBalanceRequest is the request type for the Query/Balance RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryBalanceRequest
 */
export const QueryBalanceRequest = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryBalanceRequest",
  () => [
    { no: 1, name: "class_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryBalanceResponse is the response type for the Query/Balance RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryBalanceResponse
 */
export const QueryBalanceResponse = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryBalanceResponse",
  () => [
    { no: 1, name: "amount", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * QueryOwnerRequest is the request type for the Query/Owner RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryOwnerRequest
 */
export const QueryOwnerRequest = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryOwnerRequest",
  () => [
    { no: 1, name: "class_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryOwnerResponse is the response type for the Query/Owner RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryOwnerResponse
 */
export const QueryOwnerResponse = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryOwnerResponse",
  () => [
    { no: 1, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QuerySupplyRequest is the request type for the Query/Supply RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QuerySupplyRequest
 */
export const QuerySupplyRequest = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QuerySupplyRequest",
  () => [
    { no: 1, name: "class_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QuerySupplyResponse is the response type for the Query/Supply RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QuerySupplyResponse
 */
export const QuerySupplyResponse = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QuerySupplyResponse",
  () => [
    { no: 1, name: "amount", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * QueryNFTstRequest is the request type for the Query/NFTs RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryNFTsRequest
 */
export const QueryNFTsRequest = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryNFTsRequest",
  () => [
    { no: 1, name: "class_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryNFTsResponse is the response type for the Query/NFTs RPC methods
 *
 * @generated from message cosmos.nft.v1beta1.QueryNFTsResponse
 */
export const QueryNFTsResponse = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryNFTsResponse",
  () => [
    { no: 1, name: "nfts", kind: "message", T: NFT, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

/**
 * QueryNFTRequest is the request type for the Query/NFT RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryNFTRequest
 */
export const QueryNFTRequest = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryNFTRequest",
  () => [
    { no: 1, name: "class_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryNFTResponse is the response type for the Query/NFT RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryNFTResponse
 */
export const QueryNFTResponse = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryNFTResponse",
  () => [
    { no: 1, name: "nft", kind: "message", T: NFT },
  ],
);

/**
 * QueryClassRequest is the request type for the Query/Class RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryClassRequest
 */
export const QueryClassRequest = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryClassRequest",
  () => [
    { no: 1, name: "class_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * QueryClassResponse is the response type for the Query/Class RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryClassResponse
 */
export const QueryClassResponse = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryClassResponse",
  () => [
    { no: 1, name: "class", kind: "message", T: Class },
  ],
);

/**
 * QueryClassesRequest is the request type for the Query/Classes RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryClassesRequest
 */
export const QueryClassesRequest = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryClassesRequest",
  () => [
    { no: 1, name: "pagination", kind: "message", T: PageRequest },
  ],
);

/**
 * QueryClassesResponse is the response type for the Query/Classes RPC method
 *
 * @generated from message cosmos.nft.v1beta1.QueryClassesResponse
 */
export const QueryClassesResponse = proto3.makeMessageType(
  "cosmos.nft.v1beta1.QueryClassesResponse",
  () => [
    { no: 1, name: "classes", kind: "message", T: Class, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: PageResponse },
  ],
);

