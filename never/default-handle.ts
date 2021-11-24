const strOrNum: string | number = "foo";

if (typeof strOrNum === "string") {
  console.log("I am a string");
} else if (typeof strOrNum === "number") {
  console.log("I am a number");
} else {
  const _exhaustiveCheck: never = strOrNum;
  throw new Error(`Unknown type ${_exhaustiveCheck}`);
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
      break;
  }
}
