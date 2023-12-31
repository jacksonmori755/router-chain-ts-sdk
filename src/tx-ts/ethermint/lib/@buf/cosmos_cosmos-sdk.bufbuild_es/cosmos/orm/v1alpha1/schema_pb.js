// @generated by protoc-gen-es v1.0.0 with parameter "rewrite_imports=./google/api/**/*_pb.js:@buf/googleapis_googleapis.bufbuild_es,rewrite_imports=./gogoproto/**/*_pb.js:@buf/cosmos_gogo-proto.bufbuild_es,rewrite_imports=./cosmos_proto/**/*_pb.js:@buf/cosmos_cosmos-proto.bufbuild_es"
// @generated from file cosmos/orm/v1alpha1/schema.proto (package cosmos.orm.v1alpha1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * StorageType
 *
 * @generated from enum cosmos.orm.v1alpha1.StorageType
 */
export const StorageType = proto3.makeEnum(
  "cosmos.orm.v1alpha1.StorageType",
  [
    {no: 0, name: "STORAGE_TYPE_DEFAULT_UNSPECIFIED", localName: "DEFAULT_UNSPECIFIED"},
    {no: 1, name: "STORAGE_TYPE_MEMORY", localName: "MEMORY"},
    {no: 2, name: "STORAGE_TYPE_TRANSIENT", localName: "TRANSIENT"},
    {no: 3, name: "STORAGE_TYPE_INDEX", localName: "INDEX"},
    {no: 4, name: "STORAGE_TYPE_COMMITMENT", localName: "COMMITMENT"},
  ],
);

/**
 * ModuleSchemaDescriptor describe's a module's ORM schema.
 *
 * @generated from message cosmos.orm.v1alpha1.ModuleSchemaDescriptor
 */
export const ModuleSchemaDescriptor = proto3.makeMessageType(
  "cosmos.orm.v1alpha1.ModuleSchemaDescriptor",
  () => [
    { no: 1, name: "schema_file", kind: "message", T: ModuleSchemaDescriptor_FileEntry, repeated: true },
    { no: 2, name: "prefix", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ],
);

/**
 * FileEntry describes an ORM file used in a module.
 *
 * @generated from message cosmos.orm.v1alpha1.ModuleSchemaDescriptor.FileEntry
 */
export const ModuleSchemaDescriptor_FileEntry = proto3.makeMessageType(
  "cosmos.orm.v1alpha1.ModuleSchemaDescriptor.FileEntry",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "proto_file_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "storage_type", kind: "enum", T: proto3.getEnumType(StorageType) },
  ],
  {localName: "ModuleSchemaDescriptor_FileEntry"},
);

