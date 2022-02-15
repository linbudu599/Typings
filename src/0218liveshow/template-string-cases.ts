import { Split } from './template-string-advanced-types';

export type WordSeparators = '-' | '_' | ' ';

type InnerCamelCaseStringArray<
  Fragments extends readonly any[],
  PreviousFragment
> = Fragments extends [`${infer FirstFragment}`, ...infer RemainingFragments]
  ? FirstFragment extends undefined
    ? ''
    : FirstFragment extends ''
    ? InnerCamelCaseStringArray<RemainingFragments, PreviousFragment>
    : `${PreviousFragment extends ''
        ? FirstFragment
        : Capitalize<FirstFragment>}${InnerCamelCaseStringArray<
        RemainingFragments,
        FirstFragment
      >}`
  : '';

// [d, d, d] -> dDD
type CamelCaseStringArray<Fragments extends readonly string[]> =
  Fragments extends [`${infer FirstFragment}`, ...infer RemainingFragments]
    ? Uncapitalize<`${FirstFragment}${InnerCamelCaseStringArray<
        RemainingFragments,
        FirstFragment
      >}`>
    : never;

export type CamelCase<K> = K extends string
  ? CamelCaseStringArray<
      // D-D-D > d-d-d > [d, d, d]
      Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
    >
  : K;

export type CamelCasedProperties<Value> = Value extends Function
  ? Value
  : Value extends Array<infer U>
  ? Value
  : {
      [K in keyof Value as CamelCase<K>]: Value[K];
    };
