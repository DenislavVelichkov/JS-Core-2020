function solve(input) {
    let arr = new Array(...input);
    let delimiter = arr.pop();

    return arr.join(delimiter)
}

console.log(solve(
    ['One',
        'Two',
        'Three',
        'Four',
        'Five',
        '-']
))
