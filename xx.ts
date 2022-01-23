interface SuccessResult {
  data: unknown;
  code: number;
}

interface FailureResult {
  error: unknown;
  code: number;
}

function handler(input: SuccessResult | FailureResult) {
  return new Promise((resolve, reject) => {
    if ("data" in input) {
      resolve(input.data);
    } else {
      reject(input.error);
    }
  });
}

function isSuccess(res: SuccessResult | FailureResult): res is SuccessResult {
  return "data" in res;
}

export {};

type RecordTypeMap = { n: number; s: string; b: boolean };

type UnionRecord<K extends keyof RecordTypeMap = keyof RecordTypeMap> = {
  [P in K]: {
    kind: P;
    v: RecordTypeMap[P];
    f: (v: RecordTypeMap[P]) => void;
  };
}[K];

enum PossibleType {
  Foo = "Foo",
  Bar = "Bar",
  Baz = "Baz",
}

interface TypeMap {
  Foo: number;
  Bar: string;
  Baz: boolean;
}

const typeMap: TypeMap = {
  Foo: 1,
  Bar: "2",
  Baz: true,
};

function checker(input: PossibleType) {
  switch (input) {
    case PossibleType.Foo:
      console.log("foo!");
      break;
    case PossibleType.Bar:
      console.log("bar!");
      break;
    case PossibleType.Baz:
      console.log("baz!");
      break;
    default:
      const _exhaustiveCheck: never = input;
      break;
  }
}

function dispatch(x: string | number) {
  if (typeof x === "string") {
    return 1;
  } else if (typeof x === "number") {
    return 2;
  }
  process.exit(1);
}
