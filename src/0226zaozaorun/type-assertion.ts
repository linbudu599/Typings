class Base {
  foo!: number;
}

class DerivedBar extends Base {
  bar!: number;
}

class DerivedBaz extends Base {
  baz!: number;
}

// 父类 >>> 子类 类型层级中向下转型
const a = new Base() as DerivedBaz;

// 子类 >>> 父类：拥有父类的所有方法
const baz = new DerivedBaz() as Base;

// @ts-expect-error
const c = new DerivedBar() as DerivedBaz;

const d = new DerivedBar() as Base as DerivedBaz;

export {};

// true
type _T1 = '1' extends '1' | '2' ? true : false;

// false
type _T2 = '1' | '2' | '3' extends '1' | '2' ? true : false;

type _Extract<T, U> = T extends U ? T : never;

type _T3 = _Extract<'1', '1' | '2'>;

type _T4 = _Extract<'1' | '2' | '3', '1' | '2'>;
