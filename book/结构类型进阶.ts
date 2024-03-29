export type PlainObjectType = Record<string, any>;

export type StrictCompare<T, K, A, B, C = never> = [T] extends [K]
  ? [K] extends [T]
    ? A
    : B
  : C;

type StrictConditional<A, B, Resolved, Rejected, Fallback = never> = [
  A
] extends [B]
  ? [B] extends [A]
    ? Resolved
    : Rejected
  : Fallback;

type Res1 = StrictConditional<1 | 2, 1 | 2 | 3, true, false>; // false
type Res2 = StrictConditional<1 | 2 | 3, 1 | 2, true, false, false>; // false
type Res3 = StrictConditional<1 | 2, 1 | 2, true, false>; // true

export type ValueTypeFilterPositive<
  T extends PlainObjectType,
  ValueType
> = Pick<
  T,
  {
    [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
  }[keyof T]
>;

type Conditional<Value, Condition, Resolved, Rejected> = Value extends Condition
  ? Resolved
  : Rejected;

export type ValueTypeFilter<
  T extends object,
  ValueType,
  Positive extends boolean
> = {
  [Key in keyof T]-?: T[Key] extends ValueType
    ? Conditional<Positive, true, Key, never>
    : Conditional<Positive, true, never, Key>;
}[keyof T];

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

type A = StrictOmitByValue<{ foo: 1; bar: 1 | 2; baz: 1 | 2 | 3 }, 1 | 2>;

type Tmp1 = 1 & (0 | 1); // 1
type Tmp2 = 1 & number; // 1
type Tmp3 = 1 & 1; // 1

type Tmp4 = 1 & any; // 1
type Tmp5 = 1 & unknown; // 1

type IsAny<T> = 0 extends 1 & T ? true : false; // https://stackoverflow.com/a/49928360/3406963
type IsNever<T> = [T] extends [never] ? true : false;
type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? IsAny<T> extends false
        ? true
        : false
      : false
    : false
  : false;

export type IsEqual<X, Y, A = X, B = never> = (<T>() => T extends X
  ? 1
  : 2) extends <T>() => T extends Y ? 1 : 2
  ? A
  : B;

export type PermissiveCompare<T, K, A, B, C = never> = T extends K
  ? K extends T
    ? A
    : B
  : C;

export type SetReturnType<Fn extends (...args: any[]) => any, TypeToReturn> =
  // Just using `Parameters<Fn>` isn't ideal because it doesn't handle the `this` fake parameter.
  Fn extends (this: infer ThisArg, ...args: infer Arguments) => any
    ? // If a function did not specify the `this` fake parameter, it will be inferred to `unknown`.
      // We want to detect this situation just to display a friendlier type upon hovering on an IntelliSense-powered IDE.
      IsUnknown<ThisArg> extends true
      ? (...args: Arguments) => TypeToReturn
      : (this: ThisArg, ...args: Arguments) => TypeToReturn
    : // This part should be unreachable, but we make it meaningful just in case…
      (...args: Parameters<Fn>) => TypeToReturn;
