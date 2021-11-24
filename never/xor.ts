type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

interface Foo {
  foo: string;
}

interface Bar {
  bar: string;
}

// foo + bar:never | bar + foo:never
type FooOrBar = XOR<Foo, Bar>;

const fooOrBar1: FooOrBar = { foo: "foo" };
const fooOrBar2: FooOrBar = { bar: "bar" };
// Error
// @ts-expect-error
const fooOrBar3: FooOrBar = { baz: "baz" };
// Error
// @ts-expect-error
const fooOrBar4: FooOrBar = { foo: "foo", bar: "bar" };

// 必须有sharedProp，container、module 至多有其中一个
// 如果去掉 Partial，则是 container、module 必须至少有一个
type ComposedOption = { sharedProp: string } & Partial<
  XOR<
    {
      container: {
        containerId: number;
      };
    },
    {
      module: { modId: number };
    }
  >
>;

const option: ComposedOption = {
  sharedProp: "foo",
  container: {
    containerId: 599,
  },
};
