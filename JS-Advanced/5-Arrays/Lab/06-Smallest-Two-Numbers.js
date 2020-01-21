function solve(args) {
    let input = new Array(...args);

    return input
        .sort((a, b) => a - b)
        // .filter((value, indx) => {
        //     let controlValue = input[indx + 1]

        //     return value !== controlValue;
        // })
        .slice(0, 2)
        .join(' ');
}

console.log(solve([30, 15, 50, 5]));