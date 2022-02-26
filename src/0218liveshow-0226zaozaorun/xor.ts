export type PlainObjectType = Record<string, any>;

type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

export type RequireAllOrNone<
  T extends PlainObjectType,
  K extends keyof T = never
> = (Required<Pick<T, K>> | Partial<Record<K, never>>) & Omit<T, K>;

export type RequireAtLeastOne<
  T extends PlainObjectType,
  K extends keyof T = keyof T
> = {
  [Key in K]-?: Required<Pick<T, Key>> & Partial<Pick<T, Exclude<K, Key>>>;
}[K] &
  StrictOmit<T, K>;

export type RequireExactlyOne<
  T extends PlainObjectType,
  K extends keyof T = keyof T
> = {
  [Key in K]: Required<Pick<T, Key>> & Partial<Record<Exclude<K, Key>, never>>;
}[K] &
  Omit<T, K>;
