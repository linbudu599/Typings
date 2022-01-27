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
  rec.f(rec.v);
}

type Func = (...args: ["a", number] | ["b", string]) => void;

const f1: Func = (kind, payload) => {
  if (kind === "a") {
    payload.toFixed(); // 'payload' narrowed to 'number'
  }
  if (kind === "b") {
    payload.toUpperCase(); // 'payload' narrowed to 'string'
  }
};

f1("a", 42);
f1("b", "hello");

export interface Success {
  type: `${string}Success`;
  body: string;
}

export interface Error {
  type: `${string}Error`;
  message: string;
}

function response(r: Success | Error) {
  if (r.type === "HttpSuccess") {
    return r.body;
  }
  if (r.type === "HttpError") {
    return r.message;
  }

  return null;
}

class Thing {
  someProperty = 42;

  public someMethod() {
    console.log("111");
  }
}

function foo<T extends Thing>(x: T) {
  let { someProperty, ...rest } = x;
  console.log("x: ", x);
  console.log("rest: ", rest);

  // Used to work, is now an error!
  // Property 'someMethod' does not exist on type 'Omit<T, "someProperty" | "someMethod">'.
  // rest.someMethod();
}

foo(new Thing());

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

export {};

function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  // boolean
  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello";
    // string
    console.log(x);
  } else {
    x = 100;
    // number
    console.log(x);
  }

  // string | number
  return x;
}

function yell(str: any) {
  assert(typeof str === "string");
  return str.toUppercase();
  // Oops! We misspelled 'toUpperCase'.
  // Would be great if TypeScript still caught this!
}

function assert(arg0: boolean) {
  throw new Error("Function not implemented.");
}

declare function returnNever(): never;

function dispatch1(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }
  return returnNever();
}

window.onerror = function (
  message: string | Event,
  url,
  line,
  column,
  error
) {};
