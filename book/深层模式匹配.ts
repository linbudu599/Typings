import { IsEqual } from './结构类型进阶';

type _Awaited<T> = T extends null | undefined
  ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
  : T extends object & { then(onfulfilled: infer F): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  ? F extends (value: infer V, ...args: any) => any // if the argument to `then` is callable, extracts the first argument
    ? Awaited<V> // recursively unwrap the value
    : never // the argument to `then` was not callable
  : T; // non-object or non-thenable

export type Includes<Value extends readonly any[], Item> = IsEqual<
  Value[0],
  Item
> extends true
  ? true
  : Value extends [Value[0], ...infer rest]
  ? Includes<rest, Item>
  : false;

export type RecordIndexType<T extends Record<any, any>> = T extends Record<
  infer R,
  any
>
  ? R
  : never;
