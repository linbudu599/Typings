// --- 索引签名类型 ---

// 等价于 Record<string, string>
interface Foo {
  [keys: string]: string;
}

interface Bar {
  name: string;
  age: number;
  [keys: string]: unknown;
}

// unknown
type Job = Bar['job'];

// --- 索引访问类型 ---

const stringArr = <const>['lin', 'bu', 'du'];

// "lin" | "bu" | "du"，如果移除 as const 声明，则为 string
type TypeFromArr = typeof stringArr[number];

const tuple = <const>['linbudu', true, 18];

// true | "linbudu" | 18 ，如果移除 as const 声明，则为 boolean | string | number
type TypeFromTuple = typeof tuple[number];

/**
 * 从这里数组的索引访问，typeof tuple[number] 我们可以发现一个值得关注的点是
 * 这里的索引并不是“值”，而是索引的类型（即字面量类型）
 * 所以 Person['age'] 实际上等价于：以下：
 */

type Person = { age: number; name: string; alive: boolean };

type AgeLiteralType = 'age';

// number
type AgeType = Person[AgeLiteralType];

export {};
