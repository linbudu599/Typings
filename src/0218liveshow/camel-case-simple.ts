import { expectType } from 'tsd';
export type WordSeparators = '-' | '_' | ' ';

type CamelCase<
  S extends string,
  Delimiter extends WordSeparators
> = S extends `${infer Head}${Delimiter}${infer Rest}`
  ? `${Head}${CamelCase<Capitalize<Rest>, Delimiter>}`
  : S;

// 我们并不能知道单词的分割，只能通过固定的 delimiter' 来分割

const camelFromKebab: CamelCase<'foo-bar', '-'> = 'fooBar';
expectType<'fooBar'>(camelFromKebab);

const camelFromComplexKebab: CamelCase<'foo-bar-abc', '-'> = 'fooBarAbc';
expectType<'fooBarAbc'>(camelFromComplexKebab);

const camelFromSpace: CamelCase<'foo bar', ' '> = 'fooBar';
expectType<'fooBar'>(camelFromSpace);

const camelFromSnake: CamelCase<'foo_bar_baz', '_'> = 'fooBarBaz';
expectType<'fooBarBaz'>(camelFromSnake);

const camelFromSnake1: CamelCase<'foo_Bar_z', '_'> = 'fooBarZ';
expectType<'fooBarZ'>(camelFromSnake1);

const camelFromSnake2: CamelCase<'FOO_Bar_z', '_'> = 'FOOBarZ';
expectType<'FOOBarZ'>(camelFromSnake2);

const camelFromSnake3: CamelCase<'--foo-Bar-z', '-'> = 'FooBarZ';
expectType<'FooBarZ'>(camelFromSnake3);

/**
 * 如何自动的进行 delimiter 的分割？
 * 全部转换为小写，按照可能的 delimiter 分割成数组（TODO: 应该是支持同时仅一种delimiter）
 * 对数组进行合并，
 */
