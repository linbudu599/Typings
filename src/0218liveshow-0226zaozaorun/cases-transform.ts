type SnakeCaseToCamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${SnakeCaseToCamelCase<P3>}`
    : Lowercase<S>;

type SnakeCaseKeysToCamelCase<T extends Record<string, any>> = {
  [K in keyof T as SnakeCaseToCamelCase<string & K>]: T[K] extends {}
    ? SnakeCaseKeysToCamelCase<T[K]>
    : T[K];
};

interface SnakeCase {
  bar_value: string;
  baz_value: {
    blah_test: number;
  };
}

const transformed: SnakeCaseKeysToCamelCase<SnakeCase> = {
  bazValue: {
    blahTest: 2,
  },
  barValue: 'test',
};

export {};
