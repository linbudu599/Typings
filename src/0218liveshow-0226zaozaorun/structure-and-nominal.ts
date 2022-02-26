interface Foo {
  propA: string;
}

interface Bar {
  propA: string;
}

let foo: Foo = { propA: 'linbudu' };

let bar: Bar = { propA: 'linbudu' };

foo = bar;

bar = foo;

interface Baz {
  propA: string;
  propB: number;
}

let baz: Baz = { propA: 'linbudu', propB: 599 };

// x!
baz = foo;

foo = baz;

export declare class TagProtector<T extends string> {
  protected __tag__: T;
}

export type Nominal<T, U extends string> = T & TagProtector<U>;

export type CNY = Nominal<number, 'CNY'>;

export type USD = Nominal<number, 'USD'>;

const CNYCount = 100 as CNY;

const USDCount = 100 as USD;

function addCNY(source: CNY, input: CNY) {
  return (source + input) as CNY;
}

addCNY(CNYCount, CNYCount);

addCNY(CNYCount, USDCount);

export {};
