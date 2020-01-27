function solve(input) {
    let words = input.reduce((acc, currentValue) => {
        let value = new Array(...currentValue.split(" <-> ").filter(x => x !== ""))

        let town = value[0];
        let population = parseInt(value[1]);

        if (acc.get(town)) {
            acc.set(town, acc.get(town) + population);
        } else {
            acc.set(town, population);
        }

        return acc;
    }, new Map());
   
    return [...words.entries()]
        .map((kvp) => `${kvp[0]} : ${kvp[1]}`)
        .join('\n');
}

console.log(solve(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']
));