type Person = { age: number; name: string; alive: boolean };

type PersonProps = keyof Person;

interface A {
  a: boolean;
  b: string;
  c: number;
  d: () => void;
}

type StringifyA<T> = {
  [K in keyof T]: string;
};

type Clone<T> = {
  [K in keyof T]: T[K];
};

type CloneAndRemap<T> = {
  [K in keyof T as `remapped${Capitalize<string & K>}`]: T[K];
};

export {};
