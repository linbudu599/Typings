type Func = (...args: ["a", number] | ["b", string]) => void;

const f1: Func = (kind, payload) => {
  if (kind === "a") {
    payload.toFixed(); // 'payload' narrowed to 'number'
  }
  if (kind === "b") {
    payload.toUpperCase(); // 'payload' narrowed to 'string'
  }
};

f1("a", 42);
f1("b", "hello");

export {};

export interface Success {
  type: `${string}Success`;
  body: string;
}

export interface Error {
  type: `${string}Error`;
  message: string;
}

function response(r: Success | Error) {
  if (r.type === "HttpSuccess") {
    return r.body;
  }
  if (r.type === "HttpError") {
    return r.message;
  }

  return null;
}
