"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.asPet = function () { };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () { };
    return Dog;
}(Animal));
var Corgi = /** @class */ (function (_super) {
    __extends(Corgi, _super);
    function Corgi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Corgi.prototype.cute = function () { };
    return Corgi;
}(Dog));
function makeDogBark(dog) {
    dog.bark();
}
var dog1 = new Dog();
var dog2 = new Animal();
makeDogBark(new Corgi());
// @ts-expect-error
makeDogBark(new Animal());
function transformDogAndBark(dogFactory) {
    var dog = dogFactory(new Dog());
    dog.bark();
}
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.meow = function () { };
    return Cat;
}(Animal));
// @ts-expect-error
f1 = f2; // Error with --strictFunctionTypes
f2 = f1; // Ok
// @ts-expect-error
f2 = f3; // Error
// (Animal → Corgi) ≼ (Dog → Dog)
function trainDog(d) { }
function cloneAnimalAndDoSth(source, sth) { }
var c = new Cat();
// @ts-expect-error
cloneAnimalAndDoSth(c, trainDog);
function checkIfAnimalsAreAwake(arr) { }
var myPets = [new Dog(), new Dog()];
// Error? Can't substitute Dog[] for Animal[]?
checkIfAnimalsAreAwake(myPets);
