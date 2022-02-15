export type FirstArrayItemType<T> = T extends [infer R, ...unknown[]]
  ? R
  : never;

// 1
type _Test_FirstArrayItemType = FirstArrayItemType<[1, 2, 3]>;

export type ArrayItemType<T extends Array<any>> = T extends Array<infer U>
  ? U
  : never;

// number
type _Test_ArrayItemType_1 = ArrayItemType<Array<number>>;

// 1 | 2 | 3
type _Test_ArrayItemType_2 = ArrayItemType<Array<[1, 2, 3]>>;

export type PromiseValue<T> = T extends PromiseLike<infer U>
  ? PromiseValue<U>
  : T;

// void
type _Test_PromiseValue_1 = PromiseValue<Promise<void>>;

// void
type _Test_PromiseValue_2 = PromiseValue<Promise<Promise<void>>>;
