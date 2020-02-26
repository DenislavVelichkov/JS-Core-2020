const memo = [];

let fib = (n) => {
    if (n === 1) {
        return 1;
    }

    if (n === 0) {
        return 0;
    }

    if (memo[n] !== undefined) {
        return memo[n];
    }

    let result = fib(n - 1) + fib(n - 2);
    memo[n] = result;

    return result;
}

console.log(fib(8));
