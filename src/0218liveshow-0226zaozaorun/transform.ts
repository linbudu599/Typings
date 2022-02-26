import { PlainObjectType } from './xor';

export type Object2Union<T extends PlainObjectType> = {
  [K in keyof T]: { [Q in K]: T[K] };
}[keyof T];

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
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

enum E {
  A = 'a',
  B = 'b',
  C = 'c',
}

// ('a'|'b'|'c')[];
type A = EnumMemberToRecord<E, { a: boolean; b: number; c: string }>;

export type Flattern<T> = { [K in keyof T]: T[K] };

type B = Flattern<UnionToIntersection<A>>;

export {};
