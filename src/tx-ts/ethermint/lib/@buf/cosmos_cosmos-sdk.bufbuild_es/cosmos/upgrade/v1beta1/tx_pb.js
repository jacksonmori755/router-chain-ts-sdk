// Since: cosmos-sdk 0.46

// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/upgrade/v1beta1/tx.proto (package cosmos.upgrade.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { Plan } from "./upgrade_pb.js";

/**
 * MsgSoftwareUpgrade is the Msg/SoftwareUpgrade request type.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.upgrade.v1beta1.MsgSoftwareUpgrade
 */
export const MsgSoftwareUpgrade = proto3.makeMessageType(
  "cosmos.upgrade.v1beta1.MsgSoftwareUpgrade",
  () => [
    { no: 1, name: "authority", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "plan", kind: "message", T: Plan },
  ],
);

/**
 * MsgSoftwareUpgradeResponse is the Msg/SoftwareUpgrade response type.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.upgrade.v1beta1.MsgSoftwareUpgradeResponse
 */
export const MsgSoftwareUpgradeResponse = proto3.makeMessageType(
  "cosmos.upgrade.v1beta1.MsgSoftwareUpgradeResponse",
  [],
);

/**
 * MsgCancelUpgrade is the Msg/CancelUpgrade request type.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.upgrade.v1beta1.MsgCancelUpgrade
 */
export const MsgCancelUpgrade = proto3.makeMessageType(
  "cosmos.upgrade.v1beta1.MsgCancelUpgrade",
  () => [
    { no: 1, name: "authority", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * MsgCancelUpgradeResponse is the Msg/CancelUpgrade response type.
 *
 * Since: cosmos-sdk 0.46
 *
 * @generated from message cosmos.upgrade.v1beta1.MsgCancelUpgradeResponse
 */
export const MsgCancelUpgradeResponse = proto3.makeMessageType(
  "cosmos.upgrade.v1beta1.MsgCancelUpgradeResponse",
  [],
);

