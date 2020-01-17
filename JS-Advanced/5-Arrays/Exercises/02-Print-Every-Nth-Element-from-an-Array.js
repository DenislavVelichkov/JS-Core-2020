function solve(input) {
    let arr = new Array(...input);
    let step = arr.pop();

    let filteredArr = arr.filter((value, indx) => {
        return  indx % step === 0;
    });

    return filteredArr.join('\n');;
}

console.log(solve(
    ['5',
        '20',
        '31',
        '4',
        '20',
        '2']
))