class Base {
  name!: string;
}

class Derived extends Base {
  age!: number;
}

// 类的 extends
// true
type _Test1 = Derived extends Base ? true : false;

// true
type _Test2 = { name: 'linbudu'; age: 18; job: 'engineer' } extends Base
  ? true
  : false;

// 字面量类型和原始类型的 extends
// true
type _Test3 = 'linbudu' extends string ? true : false;

// 联合类型的 extends
// false
type _Test4 = 'a' | 'b' | 'c' extends 'a' ? true : false;

// true
type _Test5 = 'a' extends 'a' | 'b' | 'c' ? true : false;

// 分布式条件类型
interface IObject {
  foo: string;
  bar: number;
  baz: boolean;
}

type Extract<T, U> = T extends U ? T : never;

// "foo" extends "foo" | "bar" extends "foo" | "baz" extends "foo"
// "foo" | "bar" | never
// "foo" | "bar"
type _ExtractKeys = Extract<keyof IObject, 'foo' | 'bar'>;

// false
type _Not_Distributed = keyof IObject extends 'foo' | 'bar' ? true : false;

export type NoDistribute<T> = T & {};

// extends 链
// 7
type _Test9 = never extends 'linbudu'
  ? 'linbudu' extends string
    ? string extends Object
      ? Object extends any
        ? any extends unknown
          ? unknown extends any
            ? 7
            : 6
          : 5
        : 4
      : 3
    : 2
  : 1;
