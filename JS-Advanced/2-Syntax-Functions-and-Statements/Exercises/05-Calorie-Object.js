/*class Product {
  name;
  calories;

  constructor() { }


  get name() {
    return this.name;
  }

  get calories() {
    return this.calories;
  }

  set name(val) {
    this.name = val;
  }

  set calories(val) {
    this.calories = val;
  }

  toString() {
    return `${this.name}: ${this.calories}`
  }
}


function solve(args) {
  let products;
  let input = new Array(...args);
  let flagForName = false;
  let flagForCalories = false;
  let product = new Product();

  input.forEach(val => {

    if (parseInt(val.toString())) {
      product.calories = parseInt(val)
      flagForName = true;
    } else {
      product.name = val
      flagForCalories = true;
    }

    if (flagForName && flagForCalories) {
      products.push(product.toString())
      product = new Product();
      flagForCalories = false;
      flagForName = false;
    }

  });

  return products;
}*/

function solve(args) {
  let arr = new Array(...args);

  return arr.reduce((accumulator, currentVal, currentIndex, inputArr) => {
    if (currentIndex % 2 === 0) {
      accumulator[currentVal] = undefined;
    } else {
      accumulator[inputArr[currentIndex - 1]] = +currentVal;
    }
    return accumulator;
  }, {}) 
}

/*function solve(args) {
  let result = {};
  for (let index = 0; index < args.length; index+=2) {
    result[args[index]] = parseInt(args[index + 1]);
  }

  return result;
}*/

console.log(solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']))