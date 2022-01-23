"use strict";
var fooOrBar1 = { foo: "foo" };
var fooOrBar2 = { bar: "bar" };
// Error
// @ts-expect-error
var fooOrBar3 = { baz: "baz" };
// Error
// @ts-expect-error
var fooOrBar4 = { foo: "foo", bar: "bar" };
var option = {
    sharedProp: "foo",
    container: {
        containerId: 599,
    },
};
