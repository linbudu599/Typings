type FuncReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type ExcludeType<T, U> = T extends U ? never : T;
type ExtractType<T, U> = T extends U ? T : never;

interface Tmp1 {
  foo: string;
  bar: string;
  baz: string;
}

interface Tmp2 {
  foo: string;
  baz: string;
}

// "bar"
type ExcludedKey = Exclude<keyof Tmp1, keyof Tmp2>;
// "foo" | "baz";
type ExtractedKey = Extract<keyof Tmp1, keyof Tmp2>;

type NonUndefined<A> = A extends undefined ? never : A;

type NonNullable<T> = T extends null | undefined ? never : T;

export type FuncTypeKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface IInterfaceWithFuncProps {
  foo: string;
  bar: string;
  func1: () => void;
  func2: () => void;
}

type A = FuncTypeKeys<IInterfaceWithFuncProps>;

interface IInterfaceWithReadonlyProps {
  readonly foo: string;
  bar: string;
  readonly func1: () => void;
  func2: () => void;
}

export type MutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >;
}[keyof T];

type Tmp<T extends object> = {
  [P in keyof T]-?: { [Q in P]: T[P] };
};

type A1 = Tmp<IInterfaceWithReadonlyProps>;

export type IMmutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

type Equal<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

type TestEqual1 = Equal<[], readonly [], "pass", "fail">;
type TestEqual2 = Equal<[], [], "pass", "fail">;

type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, "kind">]: T[K];
};

interface Circle {
  kind: "circle";
  radius: number;
}

// type KindlessCircle = {
//     radius: number;
// }
type KindlessCircle = RemoveKindField<Circle>;
