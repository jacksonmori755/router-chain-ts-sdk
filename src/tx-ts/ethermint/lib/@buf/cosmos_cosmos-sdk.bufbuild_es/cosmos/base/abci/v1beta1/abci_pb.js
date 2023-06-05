// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/base/abci/v1beta1/abci.proto (package cosmos.base.abci.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";
import { Event } from "../../../../tendermint/abci/types_pb.js";

/**
 * TxResponse defines a structure containing relevant tx data and metadata. The
 * tags are stringified and the log is JSON decoded.
 *
 * @generated from message cosmos.base.abci.v1beta1.TxResponse
 */
export const TxResponse = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.TxResponse",
  () => [
    { no: 1, name: "height", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "txhash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "codespace", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "code", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "raw_log", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "logs", kind: "message", T: ABCIMessageLog, repeated: true },
    { no: 8, name: "info", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "gas_wanted", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 10, name: "gas_used", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 11, name: "tx", kind: "message", T: Any },
    { no: 12, name: "timestamp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 13, name: "events", kind: "message", T: Event, repeated: true },
  ],
);

/**
 * ABCIMessageLog defines a structure containing an indexed tx ABCI message log.
 *
 * @generated from message cosmos.base.abci.v1beta1.ABCIMessageLog
 */
export const ABCIMessageLog = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.ABCIMessageLog",
  () => [
    { no: 1, name: "msg_index", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "log", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "events", kind: "message", T: StringEvent, repeated: true },
  ],
);

/**
 * StringEvent defines en Event object wrapper where all the attributes
 * contain key/value pairs that are strings instead of raw bytes.
 *
 * @generated from message cosmos.base.abci.v1beta1.StringEvent
 */
export const StringEvent = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.StringEvent",
  () => [
    { no: 1, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "attributes", kind: "message", T: Attribute, repeated: true },
  ],
);

/**
 * Attribute defines an attribute wrapper where the key and value are
 * strings instead of raw bytes.
 *
 * @generated from message cosmos.base.abci.v1beta1.Attribute
 */
export const Attribute = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.Attribute",
  () => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * GasInfo defines tx execution gas context.
 *
 * @generated from message cosmos.base.abci.v1beta1.GasInfo
 */
export const GasInfo = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.GasInfo",
  () => [
    { no: 1, name: "gas_wanted", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "gas_used", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * Result is the union of ResponseFormat and ResponseCheckTx.
 *
 * @generated from message cosmos.base.abci.v1beta1.Result
 */
export const Result = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.Result",
  () => [
    { no: 1, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "log", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "events", kind: "message", T: Event, repeated: true },
    { no: 4, name: "msg_responses", kind: "message", T: Any, repeated: true },
  ],
);

/**
 * SimulationResponse defines the response generated when a transaction is
 * successfully simulated.
 *
 * @generated from message cosmos.base.abci.v1beta1.SimulationResponse
 */
export const SimulationResponse = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.SimulationResponse",
  () => [
    { no: 1, name: "gas_info", kind: "message", T: GasInfo },
    { no: 2, name: "result", kind: "message", T: Result },
  ],
);

/**
 * MsgData defines the data returned in a Result object during message
 * execution.
 *
 * @generated from message cosmos.base.abci.v1beta1.MsgData
 * @deprecated
 */
export const MsgData = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.MsgData",
  () => [
    { no: 1, name: "msg_type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ],
);

/**
 * TxMsgData defines a list of MsgData. A transaction will have a MsgData object
 * for each message.
 *
 * @generated from message cosmos.base.abci.v1beta1.TxMsgData
 */
export const TxMsgData = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.TxMsgData",
  () => [
    { no: 1, name: "data", kind: "message", T: MsgData, repeated: true },
    { no: 2, name: "msg_responses", kind: "message", T: Any, repeated: true },
  ],
);

/**
 * SearchTxsResult defines a structure for querying txs pageable
 *
 * @generated from message cosmos.base.abci.v1beta1.SearchTxsResult
 */
export const SearchTxsResult = proto3.makeMessageType(
  "cosmos.base.abci.v1beta1.SearchTxsResult",
  () => [
    { no: 1, name: "total_count", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "count", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "page_number", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "page_total", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "limit", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 6, name: "txs", kind: "message", T: TxResponse, repeated: true },
  ],
);
