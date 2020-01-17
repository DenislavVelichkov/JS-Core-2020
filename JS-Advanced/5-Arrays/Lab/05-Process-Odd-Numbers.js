function solve(args) {
    let arr = new Array(...args);
    let newArr = args.filter(x => {
        let index = arr.indexOf(x);
        console.log(index)
        return index % 2 !== 0;
    })
        .map(x => x * 2)
        .reverse()
    return newArr;
}

solve([3, 0, 10, 4, 7, 3]);