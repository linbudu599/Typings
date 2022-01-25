export {};

function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  // boolean
  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello";
    // string
    console.log(x);
  } else {
    x = 100;
    // number
    console.log(x);
  }

  // string | number
  return x;
}

function yell(str: any) {
  assert(typeof str === "string");
  return str.toUppercase();
  // Oops! We misspelled 'toUpperCase'.
  // Would be great if TypeScript still caught this!
}

function assert(arg0: boolean) {
  throw new Error("Function not implemented.");
}

declare function returnNever(): never;

function dispatch(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }
  return returnNever();
}

window.onerror = function (
  message: string | Event,
  url,
  line,
  column,
  error
) {};
