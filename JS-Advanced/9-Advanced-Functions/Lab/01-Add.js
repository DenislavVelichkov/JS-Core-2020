function solve(a) {
    let acc = a;
    return function (b) {
        return acc + b;
    };
};

let add5 = solve(5);
console.log(add5(2))
console.log(add5(3))