function solve(input) {
    let arr = new Array(...input);
    let rotations = +arr.pop(arr.indexOf(arr.length - 1));
    let permutations = rotations % arr.length; // Micro optimization for same arr as default arr result.

    while(permutations-- > 0) {
        arr.unshift(arr.pop())
    }

    return arr.join(' ');
}

console.log(solve(
    ['1',
    '2',
    '3',
    '4',
    '2']
))