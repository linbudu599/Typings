type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V, K>
  : never;
