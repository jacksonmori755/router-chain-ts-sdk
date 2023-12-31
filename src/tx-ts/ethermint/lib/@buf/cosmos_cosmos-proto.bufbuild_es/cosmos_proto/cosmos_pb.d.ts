// @generated by protoc-gen-es v1.0.0
// @generated from file cosmos_proto/cosmos.proto (package cosmos_proto, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum cosmos_proto.ScalarType
 */
export declare enum ScalarType {
  /**
   * @generated from enum value: SCALAR_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: SCALAR_TYPE_STRING = 1;
   */
  STRING = 1,

  /**
   * @generated from enum value: SCALAR_TYPE_BYTES = 2;
   */
  BYTES = 2,
}

/**
 * InterfaceDescriptor describes an interface type to be used with
 * accepts_interface and implements_interface and declared by declare_interface.
 *
 * @generated from message cosmos_proto.InterfaceDescriptor
 */
export declare class InterfaceDescriptor extends Message<InterfaceDescriptor> {
  /**
   * name is the name of the interface. It should be a short-name (without
   * a period) such that the fully qualified name of the interface will be
   * package.name, ex. for the package a.b and interface named C, the
   * fully-qualified name will be a.b.C.
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * description is a human-readable description of the interface and its
   * purpose.
   *
   * @generated from field: string description = 2;
   */
  description: string;

  constructor(data?: PartialMessage<InterfaceDescriptor>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos_proto.InterfaceDescriptor";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): InterfaceDescriptor;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): InterfaceDescriptor;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): InterfaceDescriptor;

  static equals(a: InterfaceDescriptor | PlainMessage<InterfaceDescriptor> | undefined, b: InterfaceDescriptor | PlainMessage<InterfaceDescriptor> | undefined): boolean;
}

/**
 * ScalarDescriptor describes an scalar type to be used with
 * the scalar field option and declared by declare_scalar.
 * Scalars extend simple protobuf built-in types with additional
 * syntax and semantics, for instance to represent big integers.
 * Scalars should ideally define an encoding such that there is only one
 * valid syntactical representation for a given semantic meaning,
 * i.e. the encoding should be deterministic.
 *
 * @generated from message cosmos_proto.ScalarDescriptor
 */
export declare class ScalarDescriptor extends Message<ScalarDescriptor> {
  /**
   * name is the name of the scalar. It should be a short-name (without
   * a period) such that the fully qualified name of the scalar will be
   * package.name, ex. for the package a.b and scalar named C, the
   * fully-qualified name will be a.b.C.
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * description is a human-readable description of the scalar and its
   * encoding format. For instance a big integer or decimal scalar should
   * specify precisely the expected encoding format.
   *
   * @generated from field: string description = 2;
   */
  description: string;

  /**
   * field_type is the type of field with which this scalar can be used.
   * Scalars can be used with one and only one type of field so that
   * encoding standards and simple and clear. Currently only string and
   * bytes fields are supported for scalars.
   *
   * @generated from field: repeated cosmos_proto.ScalarType field_type = 3;
   */
  fieldType: ScalarType[];

  constructor(data?: PartialMessage<ScalarDescriptor>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cosmos_proto.ScalarDescriptor";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScalarDescriptor;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScalarDescriptor;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScalarDescriptor;

  static equals(a: ScalarDescriptor | PlainMessage<ScalarDescriptor> | undefined, b: ScalarDescriptor | PlainMessage<ScalarDescriptor> | undefined): boolean;
}

