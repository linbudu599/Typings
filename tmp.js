"use strict";
// type RecordTypeMap = { n: number; s: string; b: boolean };
// type RecordType<K extends keyof RecordTypeMap> = {
//   kind: K;
//   v: RecordTypeMap[K];
//   f: (v: RecordTypeMap[K]) => void;
Object.defineProperty(exports, "__esModule", { value: true });
// type UnionRecord = RecordType<"n"> | RecordType<"s"> | RecordType<"b">;
// type UnionRecord = { [P in keyof RecordTypeMap]: RecordType<P> }[keyof RecordTypeMap];
// type UnionRecord<K extends keyof RecordTypeMap = keyof RecordTypeMap> = {
//   [P in K]: RecordType<P>;
// }[K];
function processRecord(rec) {
    rec.f(rec.v); // Ok
}
