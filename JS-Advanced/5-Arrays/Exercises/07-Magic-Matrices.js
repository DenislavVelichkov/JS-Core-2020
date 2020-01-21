function solve(input) {
    let matrix = new Array(...input);
    let rowsSum = 0;
    let colsSum = 0;

    for (let row = 0; row < matrix.length; row++) {
        rowsSum += matrix[row].reduce((a, b) => a + b, 0);

        let rowCounter = 0;
        for (let col = 0; col < matrix.length; col++) {
            while (rowCounter < matrix.length) {
                colsSum += parseInt(matrix[rowCounter][col]);
                rowCounter++
            }
        }

        if (rowsSum !== colsSum 
            || matrix.length !== matrix[0].length) {
            return false;
        }
    }

    return true;
}

console.log(solve(
    [
        [1, 0, 0],
        [0, 0, 1]
    ]

))