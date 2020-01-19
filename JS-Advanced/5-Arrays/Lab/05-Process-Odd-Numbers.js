function solve(args) {
    let arr = new Array(...args);
    let newArr = arr.filter((x, index )=> {
        
        return index % 2 !== 0;
    })
        .map(x => x * 2)
        .reverse()

    return newArr.join(' ');
}

console.log(solve([3, 0, 10, 4, 7, 3]));