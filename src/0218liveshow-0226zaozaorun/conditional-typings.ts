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
type _Test2 = { name: 'linbudu' } extends Base ? true : false;

type _T4 = {} extends {} ? true : false;

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
  a: string;
  b: number;
  c: boolean;
}

// type Extract<T, U> = T extends U ? T : never;

// true
type _T7 = 'a' extends 'a' | 'b' | 'c' ? true : false;

// true
type _T8 = 'a' | 'b' extends 'a' | 'b' | 'c' ? true : false;

// false
type _T9 = 'a' | 'b' | 'wuhu!' extends 'a' | 'b' | 'c' ? true : false;

// type _T8 = 'a' | 'b' | 'c' extends 'a' ? true : false;

// "foo" extends "foo" | "bar" extends "foo" | "baz" extends "foo"
// "foo" | "bar" | never
// "foo" | "bar"
type _ExtractKeys = Extract<keyof IObject, 'foo' | 'bar'>;

type _ExtractedKeys1 = Extract<keyof IObject, 'a' | 'b'>;

type _ExtractedKeys2 = Extract<'a' | 'b' | 'c', 'a' | 'b'>;

type _ExtractedKeys3 = 'a' | 'b' | 'c' extends 'a' | 'b'
  ? 'a' | 'b' | 'c'
  : never;

// false
type _Not_Distributed = keyof IObject extends 'foo' | 'bar' ? true : false;

export type NoDistribute<T> = T & {};

// extends 链
// 7
type _Chain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | 'budulin'
    ? 'linbudu' extends string
      ? string extends {}
        ? {} extends Object
          ? Object extends any
            ? Object extends unknown
              ? any extends unknown
                ? unknown extends any
                  ? 8
                  : 7
                : 6
              : 5
            : 4
          : 3
        : 2
      : 1
    : 0
  : never;
