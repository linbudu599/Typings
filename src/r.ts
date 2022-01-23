type RecordTypeMap = { n: number; s: string; b: boolean };
type UnionRecord<K extends keyof RecordTypeMap = keyof RecordTypeMap> = {
  [P in K]: {
    kind: P;
    v: RecordTypeMap[P];
    f: (v: RecordTypeMap[P]) => void;
  };
}[K];
// type UnionRecord = RecordType<"n"> | RecordType<"s"> | RecordType<"b">;

// type UnionRecord = { [P in keyof RecordTypeMap]: RecordType<P> }[keyof RecordTypeMap];

// type UnionRecord<K extends keyof RecordTypeMap = keyof RecordTypeMap> = {
//   [P in K]: RecordType<P>;
// }[K];

function processRecord<K extends keyof RecordTypeMap>(rec: UnionRecord<K>) {
  switch (rec.kind) {
    case
  }
}

export {};
