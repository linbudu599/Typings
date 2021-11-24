let foo: any;

foo.bar().baz();

let bar: unknown;

// @ts-expect-error
bar.baz().foo();
