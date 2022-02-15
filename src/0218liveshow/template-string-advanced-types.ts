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
  : string;
