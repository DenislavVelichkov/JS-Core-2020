function solve(input) {
    let words = input.reduce((acc, currentValue) => {
        let pattern = /[\s.\-, ']+/g;
        let arr = new Array(...currentValue.split(pattern).filter(x => x !== ""))

        for (let i = 0; i < arr.length; i++) {
            let compareValue = arr[i];
            let presentKey = Object.keys(acc).find(x => x === compareValue);

            if (presentKey) {
                acc[presentKey] ++;
            } else {
                acc[arr[i]] = 1;
            }
        }

        return acc;
    }, {});

    return JSON.stringify(words);
}

console.log(solve(["Far too slow, you're far too slow."]));