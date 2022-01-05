function mayThrow(): number | never {
  try {
    return 599;
  } catch (err) {
    throw new Error("oops!");
  }
}

const strOrNum: string | number = "foo";

if (typeof strOrNum === "string") {
  console.log("str!");
} else if (typeof strOrNum === "number") {
  console.log("num!");
} else {
  const _exhaustiveCheck: never = strOrNum;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}

const strOrNumOrBool: string | number | boolean = false;

if (typeof strOrNumOrBool === "string") {
  console.log("str!");
} else if (typeof strOrNumOrBool === "number") {
  console.log("num!");
} else if (typeof strOrNumOrBool === "boolean") {
  console.log("bool!");
} else {
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}

enum PossibleType {
  Foo = "Foo",
  Bar = "Bar",
  Baz = "Baz",
  // remove comment here to see error
  // OneMore = "OneMore",
}

function checker(input: PossibleType) {
  switch (input) {
    case PossibleType.Foo:
      console.log("foo!");
      break;
    case PossibleType.Bar:
      console.log("bar!");
      break;
    case PossibleType.Baz:
      console.log("baz!");
      break;
    default:
      const _exhaustiveCheck: never = input;
      throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
      break;
  }
}
