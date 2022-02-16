import { Intersection, Difference, Complement } from './set';
import { PlainObjectType } from './xor';

// 接口并集
export type ObjectKeysMerged<
  T extends PlainObjectType,
  U extends PlainObjectType
> = keyof T | keyof U;

// 接口交集
export type ObjectKeysIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Intersection<keyof T, keyof U> & Intersection<keyof U, keyof T>;

// 接口差集
export type ObjectKeysDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Difference<keyof T, keyof U>;

// 接口补集
export type ObjectKeysComplement<
  T extends U,
  U extends Partial<PlainObjectType>
> = Complement<keyof T, keyof U>;

export type ObjectIntersection<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<T, ObjectKeysIntersection<T, U>>;

export type ObjectDifference<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<T, ObjectKeysDifference<T, U>>;

export type ObjectComplement<T extends U, U extends PlainObjectType> = Pick<
  T,
  ObjectKeysComplement<T, U>
>;

type OverrideObject<
  T extends PlainObjectType,
  U extends PlainObjectType
> = ObjectDifference<T, U> & ObjectIntersection<U, T>;

type NonOverrideObject<
  T extends PlainObjectType,
  U extends PlainObjectType
> = ObjectDifference<T, U> & ObjectIntersection<U, T> & ObjectDifference<U, T>;

export type Override<
  T extends PlainObjectType,
  U extends PlainObjectType
> = Pick<OverrideObject<T, U>, keyof OverrideObject<T, U>>;

export type Assign<T extends PlainObjectType, U extends PlainObjectType> = Pick<
  NonOverrideObject<T, U>,
  keyof NonOverrideObject<T, U>
>;
