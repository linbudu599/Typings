import { expectType, expectNotType } from 'tsd';

type CamelCase<S extends string> = S extends `${infer Head}${'_'}${infer Rest}`
  ? Capitalize<Rest> extends Rest
    ? `${Head}_${CamelCase<Rest>}`
    : `${Head}${CamelCase<Capitalize<Rest>>}`
  : S;

const camelFromKebab: CamelCase<'foo-bar'> = 'foo-bar';
expectNotType<'fooBar'>(camelFromKebab);

const camelFromSnake: CamelCase<'foo_bar'> = 'fooBar';
expectType<'fooBar'>(camelFromSnake);
