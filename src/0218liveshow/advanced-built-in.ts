import { PlainObjectType } from './xor';

export type DeepPartial<T extends PlainObjectType> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T> : T | undefined;
};

export type DeepRequired<T extends PlainObjectType> = {
  [K in keyof T]-?: T[K] extends object ? DeepPartial<T> : T;
};

export type DeepReadonly<T extends PlainObjectType> = {
  readonly [K in keyof T]: T[K] extends object ? DeepPartial<T> : T;
};

export type DeepMutable<T extends PlainObjectType> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepPartial<T> : T;
};

export type DeepNonNullable<T extends PlainObjectType> = {
  [K in keyof T]: T[K] extends object ? DeepNonNullable<T> : NonNullable<T>;
};
