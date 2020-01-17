function solve(n, k) {
    let arr = new Array();
    arr.push(1);

    for (let i = 0; i < n - 1; i++) {
        let numToAdd = 0;
        for (let j = 0; j < k; j++) {
            let tempValue = 0;
            if (arr[i - j] !== undefined) {
                tempValue = arr[i - j];
                numToAdd += tempValue;
            } else {
                numToAdd += tempValue;
            }
        }

        arr.push(numToAdd);
    }

    return arr.join(', ');
}
console.log(solve(6, 3));