function solve(input) {
    let arr = new Array(...input);

    return arr
    .sort((a,b) => {
        let result = String(a).length - String(b).length;

        return result !== 0 ? result : String(a).localeCompare(String(b)) ; 
    }).join('\n');
}


console.log(solve(
    ['alpha',
    'beta',
    'gamma']
))