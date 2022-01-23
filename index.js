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
var Foo = /** @class */ (function () {
    function Foo(name) {
    }
    return Foo;
}());
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar(name) {
        var _this = this;
        var transformed = transformer(name);
        _this = _super.call(this, transformed) || this;
        _this.someProperty = true;
        return _this;
    }
    return Bar;
}(Foo));
var transformer = function (arg) {
    return "linbudu";
};
function check(source, target) {
    // error!
    // Type 'Source' is not assignable to type 'Target'.
    //   Types of property 'prop' are incompatible.
    //     Type 'foo' | 'bar is not assignable to type 'foo'.
    //        Type 'bar is not assignable to type 'foo'.
    target = source;
}
function check(source, target) {
    target = source;
}
var stringArr = ["lin", "bu", "du"];
var tuple = ["linbudu", true, 18];
function processRecord(rec) {
    rec.f(rec.v); // Error, 'string | number | boolean' not assignable to 'never'
}
