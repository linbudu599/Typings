"use strict";
function mayThrow() {
    try {
        return 599;
    }
    catch (err) {
        throw new Error("oops!");
    }
}
var strOrNum = "foo";
if (typeof strOrNum === "string") {
    console.log("str!");
}
else if (typeof strOrNum === "number") {
    console.log("num!");
}
else {
    var _exhaustiveCheck = strOrNum;
    throw new Error("Unknown input type: " + _exhaustiveCheck);
}
var strOrNumOrBool = false;
if (typeof strOrNumOrBool === "string") {
    console.log("str!");
}
else if (typeof strOrNumOrBool === "number") {
    console.log("num!");
}
else if (typeof strOrNumOrBool === "boolean") {
    console.log("bool!");
}
else {
    var _exhaustiveCheck = strOrNumOrBool;
    throw new Error("Unknown input type: " + _exhaustiveCheck);
}
var PossibleType;
(function (PossibleType) {
    PossibleType["Foo"] = "Foo";
    PossibleType["Bar"] = "Bar";
    PossibleType["Baz"] = "Baz";
    // remove comment here to see error
    // OneMore = "OneMore",
})(PossibleType || (PossibleType = {}));
function checker(input) {
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
            var _exhaustiveCheck = input;
            throw new Error("Unknown input type: " + _exhaustiveCheck);
            break;
    }
}
