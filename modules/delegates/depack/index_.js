/*
 MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 https://www.npmjs.com/package/delegates
*/
'use strict';
class d {
  constructor(a, b) {
    this.a = a;
    this.target = b;
    this.b = [];
    this.c = [];
  }
  method(a) {
    const b = this.a, c = this.target;
    this.b.push(a);
    b[a] = function() {
      return this[c][a].apply(this[c], arguments);
    };
    return this;
  }
}
;class e {
  constructor() {
    this.response = null;
  }
}
(function() {
  var a = new d(e.prototype, "response");
  const b = a.a, c = a.target;
  a.c.push("hello");
  b.__defineGetter__("hello", function() {
    return this[c].hello;
  });
})();
const f = new e;
f.response = {hello:"world"};
console.log(f.hello);


//# sourceMappingURL=index_.js.map