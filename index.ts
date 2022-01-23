class Foo {
  constructor(name: string) {}
}

class Bar extends Foo {
  someProperty = true;

  constructor(name: string) {
    const transformed = transformer(name);
    super(transformed);
  }
}

const transformer = (arg: string) => {
  return "linbudu";
};

interface Source {
  prop: "foo" | "bar";
}

interface Target {
  prop: "foo";
}

function check(source: Source, target: Target) {
  // error!
  // Type 'Source' is not assignable to type 'Target'.
  //   Types of property 'prop' are incompatible.
  //     Type 'foo' | 'bar is not assignable to type 'foo'.
  //        Type 'bar is not assignable to type 'foo'.
  target = source;
}

interface Source<T> {
  prop: Source<Source<T>>;
}

interface Target<T> {
  prop: Target<Target<T>>;
}

function check(source: Source<"foo" | "bar">, target: Target<"foo" | "bar">) {
  target = source;
}

const stringArr = <const>["lin", "bu", "du"];

// "lin" | "bu" | "du"，如果移除 as const 声明，则为 string
type TypeFromArr = typeof stringArr[number];

const tuple = <const>["linbudu", true, 18];

// true | "linbudu" | 18 ，如果移除 as const 声明，则为 boolean | string | number
type TypeFromTuple = typeof tuple[number];

type Person = { age: number; name: string; alive: boolean };
// number
type Age = Person["age"];

// number | string
type NameOrAge = Person["age" | "name"];

// number | string | boolean
type All = Person[keyof Person];

type AgeLiteralType = "age";
type AgeType = Person[AgeLiteralType];

type PersonProps = keyof Person;

type UnionRecord =
  | { kind: "n"; v: number; f: (v: number) => void }
  | { kind: "s"; v: string; f: (v: string) => void }
  | { kind: "b"; v: boolean; f: (v: boolean) => void };

type VTypes = UnionRecord["v"];

function processRecord(rec: UnionRecord) {
  rec.f(rec.v); // Error, 'string | number | boolean' not assignable to 'never'
}
