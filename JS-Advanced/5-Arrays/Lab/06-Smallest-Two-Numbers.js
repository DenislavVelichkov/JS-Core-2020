function solve(args) {
    let input = new Array(...args);

    if (!input) {
        return 'wtf';
    } 

    return input
            .sort((a, b) => a - b)
            .filter((value, indx) => {
                let controlValue = input[indx + 1]

                return value !== controlValue;
            })
            .slice(0, 2)
            .join(' ');
}

console.log(solve([3]));