type FuncReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type ExcludeType<T, U> = T extends U ? never : T;
type ExtractType<T, U> = T extends U ? T : never;

type NonUndefined<A> = A extends undefined ? never : A;

type NonNullable<T> = T extends null | undefined ? never : T;

export type FunctTypeKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T];

export type MutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >;
}[keyof T];

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
