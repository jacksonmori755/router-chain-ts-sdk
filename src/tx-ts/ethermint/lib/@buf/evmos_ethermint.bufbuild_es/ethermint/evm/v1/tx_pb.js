// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es,rewrite_imports=./cosmos/msg/v1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/base/query/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./cosmos/auth/v1beta1/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es,rewrite_imports=./amino/**/*_pb.js:@buf/cosmos_cosmos-sdk.bufbuild_es"
// @generated from file ethermint/evm/v1/tx.proto (package ethermint.evm.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";
import { AccessTuple, Log, Params } from "./evm_pb.js";

/**
 * MsgEthereumTx encapsulates an Ethereum transaction as an SDK message.
 *
 * @generated from message ethermint.evm.v1.MsgEthereumTx
 */
export const MsgEthereumTx = proto3.makeMessageType(
  "ethermint.evm.v1.MsgEthereumTx",
  () => [
    { no: 1, name: "data", kind: "message", T: Any },
    { no: 2, name: "size", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 3, name: "hash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "from", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * LegacyTx is the transaction data of regular Ethereum transactions.
 * NOTE: All non-protected transactions (i.e non EIP155 signed) will fail if the
 * AllowUnprotectedTxs parameter is disabled.
 *
 * @generated from message ethermint.evm.v1.LegacyTx
 */
export const LegacyTx = proto3.makeMessageType(
  "ethermint.evm.v1.LegacyTx",
  () => [
    { no: 1, name: "nonce", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "gas_price", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "gas", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "to", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 7, name: "v", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 8, name: "r", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 9, name: "s", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ],
);

/**
 * AccessListTx is the data of EIP-2930 access list transactions.
 *
 * @generated from message ethermint.evm.v1.AccessListTx
 */
export const AccessListTx = proto3.makeMessageType(
  "ethermint.evm.v1.AccessListTx",
  () => [
    { no: 1, name: "chain_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "nonce", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "gas_price", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "gas", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "to", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 8, name: "accesses", kind: "message", T: AccessTuple, repeated: true },
    { no: 9, name: "v", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 10, name: "r", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 11, name: "s", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ],
);

/**
 * DynamicFeeTx is the data of EIP-1559 dinamic fee transactions.
 *
 * @generated from message ethermint.evm.v1.DynamicFeeTx
 */
export const DynamicFeeTx = proto3.makeMessageType(
  "ethermint.evm.v1.DynamicFeeTx",
  () => [
    { no: 1, name: "chain_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "nonce", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "gas_tip_cap", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "gas_fee_cap", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "gas", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 6, name: "to", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 9, name: "accesses", kind: "message", T: AccessTuple, repeated: true },
    { no: 10, name: "v", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 11, name: "r", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 12, name: "s", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ],
);

/**
 * ExtensionOptionsEthereumTx is an extension option for ethereum transactions
 *
 * @generated from message ethermint.evm.v1.ExtensionOptionsEthereumTx
 */
export const ExtensionOptionsEthereumTx = proto3.makeMessageType(
  "ethermint.evm.v1.ExtensionOptionsEthereumTx",
  [],
);

/**
 * MsgEthereumTxResponse defines the Msg/EthereumTx response type.
 *
 * @generated from message ethermint.evm.v1.MsgEthereumTxResponse
 */
export const MsgEthereumTxResponse = proto3.makeMessageType(
  "ethermint.evm.v1.MsgEthereumTxResponse",
  () => [
    { no: 1, name: "hash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "logs", kind: "message", T: Log, repeated: true },
    { no: 3, name: "ret", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "vm_error", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "gas_used", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * MsgUpdateParams defines a Msg for updating the x/evm module parameters.
 *
 * @generated from message ethermint.evm.v1.MsgUpdateParams
 */
export const MsgUpdateParams = proto3.makeMessageType(
  "ethermint.evm.v1.MsgUpdateParams",
  () => [
    { no: 1, name: "authority", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "params", kind: "message", T: Params },
  ],
);

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * @generated from message ethermint.evm.v1.MsgUpdateParamsResponse
 */
export const MsgUpdateParamsResponse = proto3.makeMessageType(
  "ethermint.evm.v1.MsgUpdateParamsResponse",
  [],
);
