// Copyright 2021 Google LLC
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

// @generated by protoc-gen-es v1.0.0
// @generated from file google/type/dayofweek.proto (package google.type, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * Represents a day of the week.
 *
 * @generated from enum google.type.DayOfWeek
 */
export const DayOfWeek = proto3.makeEnum(
  "google.type.DayOfWeek",
  [
    {no: 0, name: "DAY_OF_WEEK_UNSPECIFIED"},
    {no: 1, name: "MONDAY"},
    {no: 2, name: "TUESDAY"},
    {no: 3, name: "WEDNESDAY"},
    {no: 4, name: "THURSDAY"},
    {no: 5, name: "FRIDAY"},
    {no: 6, name: "SATURDAY"},
    {no: 7, name: "SUNDAY"},
  ],
);
