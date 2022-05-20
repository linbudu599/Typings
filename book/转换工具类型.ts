export type PlainObjectType = Record<string, any>;

export type Object2Union<T extends PlainObjectType> = {
  [K in keyof T]: { [Q in K]: T[K] };
}[keyof T];

// export type UnionToIntersection<U> = (
//   U extends any ? (k: U) => void : never
// ) extends (k: infer I) => void
//   ? I
//   : never;

export type UnionToIntersection<Union> =
  // `extends unknown` is always going to be the case and is used to convert the
  // `Union` into a [distributive conditional
  // type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
  (
    Union extends unknown
      ? // The union type is used as the only argument to a function since the union
        // of function arguments is an intersection.
        (distributedUnion: Union) => void
      : // This won't happen.
        never
  ) extends // Infer the `Intersection` type since TypeScript represents the positional
  // arguments of unions of functions as an intersection of the union.
  (mergedIntersection: infer Intersection) => void
    ? Intersection
    : never;

type TupleToUnion<T> = T extends (infer P)[] ? P : never;

// type TupleToUnion = Tuple[number]

// ('a'|'b'|'c')[];
type EnumMemberToArray<T extends string> = `${T}`[];

// 'a'|'b'|'c'
type EnumMemberToUnion<T> = `${string & T}`[] extends Array<infer Union>
  ? Union
  : never;

// { a: string; } | { b: string; } | { c: string; }
type EnumMemberToRecord<
  T extends string,
  ExpectedTypeMap extends Record<`${T}`, any>
> = `${T}`[] extends Array<infer Union>
  ? Union extends keyof any
    ? {
        [K in Union]: K extends keyof ExpectedTypeMap
          ? ExpectedTypeMap[K]
          : never;
      }
    : never
  : never;

export type PrimitiveType =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

export type LiteralUnion<LiteralType, BaseType extends PrimitiveType> =
  | LiteralType
  | (BaseType & Record<never, never>);
