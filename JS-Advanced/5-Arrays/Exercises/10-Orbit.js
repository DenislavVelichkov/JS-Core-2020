function orbit(input) {
    let rows = parseInt(input[0]);
    let cols = parseInt(input[1]);
    let starRow = parseInt(input[2]);
    let starCol = parseInt(input[3]);

    let matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push([]);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            matrix[row][col] =
             Math.max(
                 Math.abs(row - starRow), Math.abs(col - starCol)) + 1;
        }
    }

    console.log(matrix.map(row => row.join(" ")).join("\n"));
}

orbit([4, 4, 0, 0])