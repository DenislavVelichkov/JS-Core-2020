function solve(args) {
    let arr = new Array(...args);
    let firstValue = arr[0];
    let lastValue = arr[arr.length - 1];

    return parseInt(firstValue) + parseInt(lastValue);
}
console.log(solve(['20', '30', '40']));