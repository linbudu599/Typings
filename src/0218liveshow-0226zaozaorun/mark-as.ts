import { Flattern } from './transform';
import { PlainObjectType } from './xor';

export type MarkPropsAsOptional<
  T extends PlainObjectType,
  K extends keyof T = keyof T
> = Flattern<Omit<T, K> & Partial<Pick<T, K>>>;

export type MarkPropsAsRequired<
  T extends PlainObjectType,
  K extends keyof T = keyof T
> = Flattern<Omit<T, K> & Required<Pick<T, K>>>;
