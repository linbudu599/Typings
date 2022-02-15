import { PlainObjectType } from './xor';

export type Object2Union<T extends PlainObjectType> = {
  [K in keyof T]: { [Q in K]: T[K] };
}[keyof T];

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
