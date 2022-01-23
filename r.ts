class Thing {
  someProperty = 42;

  public someMethod() {
    console.log("111");
  }
}

function foo<T extends Thing>(x: T) {
  let { someProperty, ...rest } = x;
  console.log("x: ", x);
  console.log("rest: ", rest);

  // Used to work, is now an error!
  // Property 'someMethod' does not exist on type 'Omit<T, "someProperty" | "someMethod">'.
  // rest.someMethod();
}

foo(new Thing());

export {};
