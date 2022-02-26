type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type OmitByReMapping<T, K extends keyof T> = {
  [Key in K as Exclude<keyof T, Key>]: T[K];
};

type Res = {
  a: 1;
  b: 2;
};

type _d = OmitByReMapping<Res, 'a'>;

type Exclude<T, U> = T extends U ? never : T;

type Extract<T, U> = T extends U ? T : never;

type NonNullable<T> = T extends null | undefined ? never : T;

type PlainFunction = (...args: any[]) => any;

type Parameters<T extends PlainFunction> = T extends (...args: infer P) => any
  ? P
  : never;

type ReturnType<T extends PlainFunction> = T extends (...args: any) => infer R
  ? R
  : any;

type PlainClass = abstract new (...args: any[]) => any;

type ConstructorParameters<T extends PlainClass> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

type InstanceType<T extends PlainClass> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;

export {};
