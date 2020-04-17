console.log("xie.zheshi这");
require("./index.css");
require("./index.scss");

console.log(`sie`.includes("i"));

class Foo {
  constructor(name) {
    this.name = name;
  }
  say() {
    return `${this.name} say hello!`;
  }
}
const f = new Foo("xie");
console.log(f.name);
console.log(f.say());
