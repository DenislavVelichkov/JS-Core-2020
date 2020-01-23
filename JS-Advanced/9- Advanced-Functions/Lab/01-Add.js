function solve(a) {
    let sum = a;
   
    return function (b) {
        return sum + b;
    }
};

let add5 = solve(5);
console.log(add5(2))
console.log(add5(3))
