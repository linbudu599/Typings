"use strict";
var foo;
foo.bar().baz();
var bar;
// @ts-expect-error
bar.baz().foo();
