export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;

// 对称差集
export type SymmetricDifference<A, B> = Difference<A | B, A & B>;

type _T1 = string & number;

type _T2 = ('a' | 'b') & ('a' | 'd' | 'e' | 'f');
