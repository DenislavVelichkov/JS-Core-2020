function solve(args) {
    let arr = new Array(...args);
    let filteredArray = arr.filter(value => arr.indexOf(value) % 2 == 0);

    return filteredArray.join(' ');
}

console.log(solve(['20', '30', '40']));