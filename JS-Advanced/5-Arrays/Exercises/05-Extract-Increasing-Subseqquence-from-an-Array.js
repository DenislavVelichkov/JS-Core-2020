function solve(input) {
    let arr = new Array(...input)
    let newArr = arr.reduce((acc, current) => {

        const lastElement = acc[acc.length - 1];

        if (current >= lastElement || lastElement === undefined) {
            acc.push(current);
        }

        return acc;
    }, []);

    return newArr.join('\n')// [] Defines accomulator's type.
}

console.log(solve(
    [
        1,
        3,
        8,
        4,
        10,
        12,
        3,
        2,
        24
    ]
))