export type IsEqual<X, Y, A = X, B = never> = (<T>() => T extends X
  ? 1
  : 2) extends <T>() => T extends Y ? 1 : 2
  ? A
  : B;

export type StrictCompare<T, K, A, B, C = never> = [T] extends [K]
  ? [K] extends [T]
    ? A
    : B
  : C;

export type PermissiveCompare<T, K, A, B, C = never> = T extends K
  ? K extends T
    ? A
    : B
  : C;

type _1A = Extract<'a' | 'b' | 'c', 'a' | 'b' | 'd'>;

type A = StrictCompare<'a', 'a' | 'b', 1, 2>;

type A1 = PermissiveCompare<'a', 'a' | 'b', 1, 2>;

type aa = 'a' extends 'a' | 'b' ? 1 : 2;

type a1 = 'a' | 'b' extends 'a' ? 1 : 2;

export type IsNever<T> = [T] extends [never] ? true : false;
