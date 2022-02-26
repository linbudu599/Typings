type World = 'World';

type Empty = ' ';

type ExclamationMark = '!';

// 'Hello World!';
type Composed = `Hello${Empty}${World}${ExclamationMark}`;

// 实际使用

// 模板字符串类型的类型守卫
export interface ISuccess {
  type: `${string}Success`;
  body: string;
}

export interface IError {
  type: `${string}Error`;
  message: string;
}

export function isSuccess(r: ISuccess | IError): r is ISuccess {
  return r.type === 'HttpSuccess';
}

interface IRes {
  code: 200 | 400 | 500;
  status: 'success' | 'failure';
  mixed: true | 'wuhu!';
}

// 重映射
type CloneAndRemap<T> = {
  [K in keyof T as `updated${Capitalize<string & K>}`]: T[K];
};

/**
 * {
 *  updatedCode: 200 | 400 | 500;
 *  updatedStatus: "success" | "failure";
 *  updatedMixed: true | "wuhu!";
 * }
 */
type ClonedRes = CloneAndRemap<IRes>;
