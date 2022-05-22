export type PlainObjectType = Record<string, any>;

export type Flattern<T> = { [K in keyof T]: T[K] };

export type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

// 也可以记作 DeepImmutable
export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

export type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

// export type DeepNonNullable<T extends object> = {
//   [K in keyof T]: T[K] extends object ? DeepNonNullable<T> : NonNullable<T>;
// };

export type MarkPropsAsOptional<
  T extends PlainObjectType,
  K extends keyof T = keyof T
> = Flattern<Omit<T, K> & Partial<Pick<T, K>>>;

export type MarkPropsAsRequired<
  T extends PlainObjectType,
  K extends keyof T = keyof T
> = Flattern<Omit<T, K> & Required<Pick<T, K>>>;
