export type SplitFirst<S extends string> =
  S extends `${infer First}---${infer Tail}` ? `${Tail}---${First}` : S;

type _SplitFirst = SplitFirst<'林---不渡'>;

export type SplitSimple<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}` ? [Head, Tail] : [S];

export type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

export type Join<
  Strings extends Array<string | number>,
  Delimiter extends string
> = Strings extends []
  ? ''
  : Strings extends [string | number]
  ? `${Strings[0]}`
  : Strings extends [string | number, ...infer Rest]
  ? // @ts-expect-error `Rest` is inferred as `unknown` here
    `${Strings[0]}${Delimiter}${Join<Rest, Delimiter>}`
  : String;

export type TrimLeft<V extends string> = V extends ` ${infer R}`
  ? TrimLeft<R>
  : V;

export type TrimRight<V extends string> = V extends `${infer R} `
  ? TrimRight<R>
  : V;

export type Trim<V extends string> = TrimLeft<TrimRight<V>>;
