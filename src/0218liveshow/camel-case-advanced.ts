import { Split } from './template-string-advanced-types';
import { expectType } from 'tsd';
import { PlainObjectType } from './xor';

export type WordSeparators = '-' | '_' | ' ';

// 如果 PreviousFragment 不是 ''，就将 FirstFragment 转换为大写
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

type A = CamelCaseStringArray<['a', 'b', 'c']>;

export type CamelCase<K extends string> = CamelCaseStringArray<
  // D-D-D > d-d-d > [d, d, d]
  Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
>;

type SplitS<K extends string> = Split<
  K extends Uppercase<K> ? Lowercase<K> : K,
  WordSeparators
>;

type A1 = SplitS<'a-B-c'>;

type A12 = CamelCase<'a-bd'>;

export type CamelCasedProperties<Value extends PlainObjectType> = {
  [K in keyof Value as CamelCase<string & K>]: Value[K];
};

const prefixSplit: Split<'--very-prefixed', '-'> = ['', '', 'very', 'prefixed'];
expectType<['', '', 'very', 'prefixed']>(prefixSplit);
