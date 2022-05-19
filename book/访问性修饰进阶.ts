export type PlainObjectType = Record<string, any>;

export type Flattern<T> = { [K in keyof T]: T[K] };

export type DeepPartial<T extends PlainObjectType> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T> : T | undefined;
};

export type DeepRequired<T extends PlainObjectType> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T> : T;
};

export type DeepReadonly<T extends PlainObjectType> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T> : T;
};

export type DeepMutable<T extends PlainObjectType> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T> : T;
};

export type DeepNonNullable<T extends PlainObjectType> = {
  [K in keyof T]: T[K] extends object ? DeepNonNullable<T> : NonNullable<T>;
};

export type MarkPropsAsOptional<
  T extends PlainObjectType,
  K extends keyof T = keyof T
> = Flattern<Omit<T, K> & Partial<Pick<T, K>>>;

export type MarkPropsAsRequired<
  T extends PlainObjectType,
  K extends keyof T = keyof T
> = Flattern<Omit<T, K> & Required<Pick<T, K>>>;
