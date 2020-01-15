class Product {
  name
  calories

  constructor() { }

  set name(val) {
    this.name = val;
  }

  set calories(val) {
    this.calories = val;
  }
}

function solve(args) {
  let input = new Array(...args);
  console.log(input)
}