import { StrictCompare } from './advanced';
import { PlainObjectType } from './xor';

export type DeepPartial<T extends PlainObjectType> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T> : T | undefined;
};

export type DeepRequired<T extends PlainObjectType> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T> : T;
};

export type DeepReadonly<T extends PlainObjectType> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T> : T;
};

export type DeepMutable<T extends PlainObjectType> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T> : T;
};

export type DeepNonNullable<T extends PlainObjectType> = {
  [K in keyof T]: T[K] extends object ? DeepNonNullable<T> : NonNullable<T>;
};

export type ValueTypeFilterPositive<
  T extends PlainObjectType,
  ValueType
> = Pick<
  T,
  {
    [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
  }[keyof T]
>;

export type ValueTypeFilter<
  T extends PlainObjectType,
  ValueType,
  Positive extends boolean
> = Pick<
  T,
  {
    [Key in keyof T]-?: T[Key] extends ValueType
      ? Positive extends true
        ? Key
        : never
      : Positive extends true
      ? never
      : Key;
  }[keyof T]
>;

export type PickByValue<T extends PlainObjectType, ValueType> = ValueTypeFilter<
  T,
  ValueType,
  true
>;

export type OmitByValue<T extends PlainObjectType, ValueType> = ValueTypeFilter<
  T,
  ValueType,
  false
>;

export type StrictValueTypeFilter<
  T extends PlainObjectType,
  ValueType,
  Positive extends boolean
> = Pick<
  T,
  {
    [Key in keyof T]-?: StrictCompare<
      ValueType,
      T[Key],
      Positive extends true ? Key : never,
      Positive extends true ? never : Key
    >;
  }[keyof T]
>;

export type StrictPickByValue<
  T extends PlainObjectType,
  ValueType
> = StrictValueTypeFilter<T, ValueType, true>;

export type StrictOmitByValue<
  T extends PlainObjectType,
  ValueType
> = StrictValueTypeFilter<T, ValueType, false>;
