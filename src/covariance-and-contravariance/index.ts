type ToolType<T> = T extends "a" | "b" | "c" ? 1 : 2;

type Test1 = ToolType<"a">;
type Test2 = ToolType<"a" | "b">;

type Test3 = ToolType<"d">;

class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}

function makeDogBark(dog: Dog) {
  dog.bark();
}

const dog1: Animal = new Dog();
const dog2: Animal = new Animal();

makeDogBark(new Corgi());
// @ts-expect-error
makeDogBark(new Animal());

type DogFactory = (args: Dog) => Dog;

function transformDogAndBark(dogFactory: DogFactory) {
  const dog = dogFactory(new Dog());
  dog.bark();
}

type AsFuncArgType<T> = (arg: T) => void;

type AsFuncReturnType<T> = (arg: unknown) => T;

// 不成立：Corgi -> void ≼ Dog -> void
type CheckArgType = AsFuncArgType<Corgi> extends AsFuncArgType<Dog> ? 1 : 2;

// 成立：unknown -> Corgi ≼ unknown -> Dog
type CheckReturnType = AsFuncReturnType<Corgi> extends AsFuncReturnType<Dog>
  ? 1
  : 2;

class Cat extends Animal {
  meow() {}
}

declare let f1: (x: Animal) => void;
declare let f2: (x: Dog) => void;
declare let f3: (x: Cat) => void;
// @ts-expect-error
f1 = f2; // Error with --strictFunctionTypes
f2 = f1; // Ok
// @ts-expect-error
f2 = f3; // Error

// (Animal → Corgi) ≼ (Dog → Dog)

function trainDog(d: Dog) {}
function cloneAnimalAndDoSth(
  source: Animal,
  sth: (result: Animal) => void
): void {}

let c = new Cat();
// @ts-expect-error
cloneAnimalAndDoSth(c, trainDog);

function checkIfAnimalsAreAwake(arr: Animal[]) {}

let myPets: Dog[] = [new Dog(), new Dog()];

// Error? Can't substitute Dog[] for Animal[]?
checkIfAnimalsAreAwake(myPets);
