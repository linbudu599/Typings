export type UpperCaseCharacters =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type WordSeparators = '-' | '_' | ' ';

export type SplitIncludingDelimiters<
  Source extends string,
  Delimiter extends string
> = Source extends ''
  ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
  ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
    ? UsedDelimiter extends Delimiter
      ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
        ? [
            ...SplitIncludingDelimiters<FirstPart, Delimiter>,
            UsedDelimiter,
            ...SplitIncludingDelimiters<SecondPart, Delimiter>
          ]
        : never
      : never
    : never
  : [Source];

type StringPartToDelimiterCase<
  StringPart extends string,
  Start extends boolean,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string
> = StringPart extends UsedWordSeparators
  ? Delimiter
  : Start extends true
  ? Lowercase<StringPart>
  : StringPart extends UsedUpperCaseCharacters
  ? `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;

type StringArrayToDelimiterCase<
  Parts extends readonly any[],
  Start extends boolean,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? `${StringPartToDelimiterCase<
      FirstPart,
      Start,
      UsedWordSeparators,
      UsedUpperCaseCharacters,
      Delimiter
    >}${StringArrayToDelimiterCase<
      RemainingParts,
      false,
      UsedWordSeparators,
      UsedUpperCaseCharacters,
      Delimiter
    >}`
  : Parts extends [string]
  ? string
  : '';

export type DelimiterCase<
  Value extends string,
  Delimiter extends string
> = StringArrayToDelimiterCase<
  SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
  true,
  WordSeparators,
  UpperCaseCharacters,
  Delimiter
>;
