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

type Foo = {
  a: number;
  b: string;
};

type Bar = {
  b: number;
};

type A = ObjectIntersection<Foo, Bar>;

type Override<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 U 优先级更高（逆并集）)
> = ObjectDifference<T, U> & ObjectIntersection<U, T>;

type Assign<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 T 优先级更高，再加上 U 比 T 多的部分即可
> = ObjectDifference<T, U> & ObjectIntersection<T, U> & ObjectDifference<U, T>;

type Merge<
  T extends PlainObjectType,
  U extends PlainObjectType
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 U 优先级更高，再加上 U 比 T 多的部分即可
> = ObjectDifference<T, U> & ObjectIntersection<U, T> & ObjectDifference<U, T>;

// Override 强调使用后者在前者中有的键值类型覆盖，Assign 强调将后者独有的的键值合并到前者（不覆盖已有的）

// 可以再 Flattern 一次
