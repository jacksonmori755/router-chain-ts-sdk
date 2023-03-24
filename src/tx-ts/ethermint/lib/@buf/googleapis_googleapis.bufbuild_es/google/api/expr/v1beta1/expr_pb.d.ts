// Copyright 2019 Google LLC.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// @generated by protoc-gen-es v1.0.0
// @generated from file google/api/expr/v1beta1/expr.proto (package google.api.expr.v1beta1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, NullValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { SourceInfo } from "./source_pb.js";

/**
 * An expression together with source information as returned by the parser.
 *
 * @generated from message google.api.expr.v1beta1.ParsedExpr
 */
export declare class ParsedExpr extends Message<ParsedExpr> {
  /**
   * The parsed expression.
   *
   * @generated from field: google.api.expr.v1beta1.Expr expr = 2;
   */
  expr?: Expr;

  /**
   * The source info derived from input that generated the parsed `expr`.
   *
   * @generated from field: google.api.expr.v1beta1.SourceInfo source_info = 3;
   */
  sourceInfo?: SourceInfo;

  /**
   * The syntax version of the source, e.g. `cel1`.
   *
   * @generated from field: string syntax_version = 4;
   */
  syntaxVersion: string;

  constructor(data?: PartialMessage<ParsedExpr>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.ParsedExpr";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParsedExpr;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParsedExpr;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParsedExpr;

  static equals(a: ParsedExpr | PlainMessage<ParsedExpr> | undefined, b: ParsedExpr | PlainMessage<ParsedExpr> | undefined): boolean;
}

/**
 * An abstract representation of a common expression.
 *
 * Expressions are abstractly represented as a collection of identifiers,
 * select statements, function calls, literals, and comprehensions. All
 * operators with the exception of the '.' operator are modelled as function
 * calls. This makes it easy to represent new operators into the existing AST.
 *
 * All references within expressions must resolve to a [Decl][google.api.expr.v1beta1.Decl] provided at
 * type-check for an expression to be valid. A reference may either be a bare
 * identifier `name` or a qualified identifier `google.api.name`. References
 * may either refer to a value or a function declaration.
 *
 * For example, the expression `google.api.name.startsWith('expr')` references
 * the declaration `google.api.name` within a [Expr.Select][google.api.expr.v1beta1.Expr.Select] expression, and
 * the function declaration `startsWith`.
 *
 * @generated from message google.api.expr.v1beta1.Expr
 */
export declare class Expr extends Message<Expr> {
  /**
   * Required. An id assigned to this node by the parser which is unique in a
   * given expression tree. This is used to associate type information and other
   * attributes to a node in the parse tree.
   *
   * @generated from field: int32 id = 2;
   */
  id: number;

  /**
   * Required. Variants of expressions.
   *
   * @generated from oneof google.api.expr.v1beta1.Expr.expr_kind
   */
  exprKind: {
    /**
     * A literal expression.
     *
     * @generated from field: google.api.expr.v1beta1.Literal literal_expr = 3;
     */
    value: Literal;
    case: "literalExpr";
  } | {
    /**
     * An identifier expression.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.Ident ident_expr = 4;
     */
    value: Expr_Ident;
    case: "identExpr";
  } | {
    /**
     * A field selection expression, e.g. `request.auth`.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.Select select_expr = 5;
     */
    value: Expr_Select;
    case: "selectExpr";
  } | {
    /**
     * A call expression, including calls to predefined functions and operators.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.Call call_expr = 6;
     */
    value: Expr_Call;
    case: "callExpr";
  } | {
    /**
     * A list creation expression.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.CreateList list_expr = 7;
     */
    value: Expr_CreateList;
    case: "listExpr";
  } | {
    /**
     * A map or object creation expression.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.CreateStruct struct_expr = 8;
     */
    value: Expr_CreateStruct;
    case: "structExpr";
  } | {
    /**
     * A comprehension expression.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.Comprehension comprehension_expr = 9;
     */
    value: Expr_Comprehension;
    case: "comprehensionExpr";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<Expr>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Expr";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expr;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expr;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expr;

  static equals(a: Expr | PlainMessage<Expr> | undefined, b: Expr | PlainMessage<Expr> | undefined): boolean;
}

/**
 * An identifier expression. e.g. `request`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.Ident
 */
export declare class Expr_Ident extends Message<Expr_Ident> {
  /**
   * Required. Holds a single, unqualified identifier, possibly preceded by a
   * '.'.
   *
   * Qualified names are represented by the [Expr.Select][google.api.expr.v1beta1.Expr.Select] expression.
   *
   * @generated from field: string name = 1;
   */
  name: string;

  constructor(data?: PartialMessage<Expr_Ident>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Expr.Ident";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expr_Ident;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expr_Ident;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expr_Ident;

  static equals(a: Expr_Ident | PlainMessage<Expr_Ident> | undefined, b: Expr_Ident | PlainMessage<Expr_Ident> | undefined): boolean;
}

/**
 * A field selection expression. e.g. `request.auth`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.Select
 */
export declare class Expr_Select extends Message<Expr_Select> {
  /**
   * Required. The target of the selection expression.
   *
   * For example, in the select expression `request.auth`, the `request`
   * portion of the expression is the `operand`.
   *
   * @generated from field: google.api.expr.v1beta1.Expr operand = 1;
   */
  operand?: Expr;

  /**
   * Required. The name of the field to select.
   *
   * For example, in the select expression `request.auth`, the `auth` portion
   * of the expression would be the `field`.
   *
   * @generated from field: string field = 2;
   */
  field: string;

  /**
   * Whether the select is to be interpreted as a field presence test.
   *
   * This results from the macro `has(request.auth)`.
   *
   * @generated from field: bool test_only = 3;
   */
  testOnly: boolean;

  constructor(data?: PartialMessage<Expr_Select>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Expr.Select";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expr_Select;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expr_Select;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expr_Select;

  static equals(a: Expr_Select | PlainMessage<Expr_Select> | undefined, b: Expr_Select | PlainMessage<Expr_Select> | undefined): boolean;
}

/**
 * A call expression, including calls to predefined functions and operators.
 *
 * For example, `value == 10`, `size(map_value)`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.Call
 */
export declare class Expr_Call extends Message<Expr_Call> {
  /**
   * The target of an method call-style expression. For example, `x` in
   * `x.f()`.
   *
   * @generated from field: google.api.expr.v1beta1.Expr target = 1;
   */
  target?: Expr;

  /**
   * Required. The name of the function or method being called.
   *
   * @generated from field: string function = 2;
   */
  function: string;

  /**
   * The arguments.
   *
   * @generated from field: repeated google.api.expr.v1beta1.Expr args = 3;
   */
  args: Expr[];

  constructor(data?: PartialMessage<Expr_Call>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Expr.Call";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expr_Call;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expr_Call;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expr_Call;

  static equals(a: Expr_Call | PlainMessage<Expr_Call> | undefined, b: Expr_Call | PlainMessage<Expr_Call> | undefined): boolean;
}

/**
 * A list creation expression.
 *
 * Lists may either be homogenous, e.g. `[1, 2, 3]`, or heterogenous, e.g.
 * `dyn([1, 'hello', 2.0])`
 *
 * @generated from message google.api.expr.v1beta1.Expr.CreateList
 */
export declare class Expr_CreateList extends Message<Expr_CreateList> {
  /**
   * The elements part of the list.
   *
   * @generated from field: repeated google.api.expr.v1beta1.Expr elements = 1;
   */
  elements: Expr[];

  constructor(data?: PartialMessage<Expr_CreateList>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Expr.CreateList";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expr_CreateList;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expr_CreateList;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expr_CreateList;

  static equals(a: Expr_CreateList | PlainMessage<Expr_CreateList> | undefined, b: Expr_CreateList | PlainMessage<Expr_CreateList> | undefined): boolean;
}

/**
 * A map or message creation expression.
 *
 * Maps are constructed as `{'key_name': 'value'}`. Message construction is
 * similar, but prefixed with a type name and composed of field ids:
 * `types.MyType{field_id: 'value'}`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.CreateStruct
 */
export declare class Expr_CreateStruct extends Message<Expr_CreateStruct> {
  /**
   * The type name of the message to be created, empty when creating map
   * literals.
   *
   * @generated from field: string type = 1;
   */
  type: string;

  /**
   * The entries in the creation expression.
   *
   * @generated from field: repeated google.api.expr.v1beta1.Expr.CreateStruct.Entry entries = 2;
   */
  entries: Expr_CreateStruct_Entry[];

  constructor(data?: PartialMessage<Expr_CreateStruct>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Expr.CreateStruct";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expr_CreateStruct;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expr_CreateStruct;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expr_CreateStruct;

  static equals(a: Expr_CreateStruct | PlainMessage<Expr_CreateStruct> | undefined, b: Expr_CreateStruct | PlainMessage<Expr_CreateStruct> | undefined): boolean;
}

/**
 * Represents an entry.
 *
 * @generated from message google.api.expr.v1beta1.Expr.CreateStruct.Entry
 */
export declare class Expr_CreateStruct_Entry extends Message<Expr_CreateStruct_Entry> {
  /**
   * Required. An id assigned to this node by the parser which is unique
   * in a given expression tree. This is used to associate type
   * information and other attributes to the node.
   *
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * The `Entry` key kinds.
   *
   * @generated from oneof google.api.expr.v1beta1.Expr.CreateStruct.Entry.key_kind
   */
  keyKind: {
    /**
     * The field key for a message creator statement.
     *
     * @generated from field: string field_key = 2;
     */
    value: string;
    case: "fieldKey";
  } | {
    /**
     * The key expression for a map creation statement.
     *
     * @generated from field: google.api.expr.v1beta1.Expr map_key = 3;
     */
    value: Expr;
    case: "mapKey";
  } | { case: undefined; value?: undefined };

  /**
   * Required. The value assigned to the key.
   *
   * @generated from field: google.api.expr.v1beta1.Expr value = 4;
   */
  value?: Expr;

  constructor(data?: PartialMessage<Expr_CreateStruct_Entry>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Expr.CreateStruct.Entry";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expr_CreateStruct_Entry;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expr_CreateStruct_Entry;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expr_CreateStruct_Entry;

  static equals(a: Expr_CreateStruct_Entry | PlainMessage<Expr_CreateStruct_Entry> | undefined, b: Expr_CreateStruct_Entry | PlainMessage<Expr_CreateStruct_Entry> | undefined): boolean;
}

/**
 * A comprehension expression applied to a list or map.
 *
 * Comprehensions are not part of the core syntax, but enabled with macros.
 * A macro matches a specific call signature within a parsed AST and replaces
 * the call with an alternate AST block. Macro expansion happens at parse
 * time.
 *
 * The following macros are supported within CEL:
 *
 * Aggregate type macros may be applied to all elements in a list or all keys
 * in a map:
 *
 * *  `all`, `exists`, `exists_one` -  test a predicate expression against
 *    the inputs and return `true` if the predicate is satisfied for all,
 *    any, or only one value `list.all(x, x < 10)`.
 * *  `filter` - test a predicate expression against the inputs and return
 *    the subset of elements which satisfy the predicate:
 *    `payments.filter(p, p > 1000)`.
 * *  `map` - apply an expression to all elements in the input and return the
 *    output aggregate type: `[1, 2, 3].map(i, i * i)`.
 *
 * The `has(m.x)` macro tests whether the property `x` is present in struct
 * `m`. The semantics of this macro depend on the type of `m`. For proto2
 * messages `has(m.x)` is defined as 'defined, but not set`. For proto3, the
 * macro tests whether the property is set to its default. For map and struct
 * types, the macro tests whether the property `x` is defined on `m`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.Comprehension
 */
export declare class Expr_Comprehension extends Message<Expr_Comprehension> {
  /**
   * The name of the iteration variable.
   *
   * @generated from field: string iter_var = 1;
   */
  iterVar: string;

  /**
   * The range over which var iterates.
   *
   * @generated from field: google.api.expr.v1beta1.Expr iter_range = 2;
   */
  iterRange?: Expr;

  /**
   * The name of the variable used for accumulation of the result.
   *
   * @generated from field: string accu_var = 3;
   */
  accuVar: string;

  /**
   * The initial value of the accumulator.
   *
   * @generated from field: google.api.expr.v1beta1.Expr accu_init = 4;
   */
  accuInit?: Expr;

  /**
   * An expression which can contain iter_var and accu_var.
   *
   * Returns false when the result has been computed and may be used as
   * a hint to short-circuit the remainder of the comprehension.
   *
   * @generated from field: google.api.expr.v1beta1.Expr loop_condition = 5;
   */
  loopCondition?: Expr;

  /**
   * An expression which can contain iter_var and accu_var.
   *
   * Computes the next value of accu_var.
   *
   * @generated from field: google.api.expr.v1beta1.Expr loop_step = 6;
   */
  loopStep?: Expr;

  /**
   * An expression which can contain accu_var.
   *
   * Computes the result.
   *
   * @generated from field: google.api.expr.v1beta1.Expr result = 7;
   */
  result?: Expr;

  constructor(data?: PartialMessage<Expr_Comprehension>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Expr.Comprehension";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expr_Comprehension;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expr_Comprehension;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expr_Comprehension;

  static equals(a: Expr_Comprehension | PlainMessage<Expr_Comprehension> | undefined, b: Expr_Comprehension | PlainMessage<Expr_Comprehension> | undefined): boolean;
}

/**
 * Represents a primitive literal.
 *
 * This is similar to the primitives supported in the well-known type
 * `google.protobuf.Value`, but richer so it can represent CEL's full range of
 * primitives.
 *
 * Lists and structs are not included as constants as these aggregate types may
 * contain [Expr][google.api.expr.v1beta1.Expr] elements which require evaluation and are thus not constant.
 *
 * Examples of literals include: `"hello"`, `b'bytes'`, `1u`, `4.2`, `-2`,
 * `true`, `null`.
 *
 * @generated from message google.api.expr.v1beta1.Literal
 */
export declare class Literal extends Message<Literal> {
  /**
   * Required. The valid constant kinds.
   *
   * @generated from oneof google.api.expr.v1beta1.Literal.constant_kind
   */
  constantKind: {
    /**
     * null value.
     *
     * @generated from field: google.protobuf.NullValue null_value = 1;
     */
    value: NullValue;
    case: "nullValue";
  } | {
    /**
     * boolean value.
     *
     * @generated from field: bool bool_value = 2;
     */
    value: boolean;
    case: "boolValue";
  } | {
    /**
     * int64 value.
     *
     * @generated from field: int64 int64_value = 3;
     */
    value: bigint;
    case: "int64Value";
  } | {
    /**
     * uint64 value.
     *
     * @generated from field: uint64 uint64_value = 4;
     */
    value: bigint;
    case: "uint64Value";
  } | {
    /**
     * double value.
     *
     * @generated from field: double double_value = 5;
     */
    value: number;
    case: "doubleValue";
  } | {
    /**
     * string value.
     *
     * @generated from field: string string_value = 6;
     */
    value: string;
    case: "stringValue";
  } | {
    /**
     * bytes value.
     *
     * @generated from field: bytes bytes_value = 7;
     */
    value: Uint8Array;
    case: "bytesValue";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<Literal>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.api.expr.v1beta1.Literal";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Literal;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Literal;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Literal;

  static equals(a: Literal | PlainMessage<Literal> | undefined, b: Literal | PlainMessage<Literal> | undefined): boolean;
}

