function solve(input) {
    let arr = new Array(...input);
    let resultArr = new Array();

    if (!input) return 'Empty';

    let counter = 0;
    arr.forEach(x => {
        switch (x) {
            case 'add':
                resultArr.push(++counter)
                break;

            case 'remove':
                ++counter
                resultArr.pop()
                break;
        }
    })

    return resultArr.length == 0 ? "Empty" : resultArr.join('\n');
}

console.log(solve(['remove',
    'remove',
    'remove']
))