function solve(input = []) {
    let playerTurn = 1;
    let matrix = [[false, false, false], [false, false, false], [false, false, false]];

    while (input.length !== 0) {
        
        if (playerTurn++ % 2 !== 0) {
            let playerOneTurn = input.shift().split(" ");
            if (isPlaceTaken(playerOneTurn[0], playerOneTurn[1], matrix)) {
                matrix[playerOneTurn[0]][playerOneTurn[1]] = "X"
            } else {
                playerTurn--;
                console.log("This place is already taken. Please choose another!")
            }
        } else {
            let playerTwoTurn = input.shift().split(" ");
            if (isPlaceTaken(playerTwoTurn[0], playerTwoTurn[1], matrix)) {
                matrix[playerTwoTurn[0]][playerTwoTurn[1]] = "O"
            } else {
                playerTurn--;
                console.log("This place is already taken. Please choose another!")
            }
        }

        let currentPlayer = playerTurn % 2 !== 0 ? "O" : "X";

        if (isAWin(matrix, currentPlayer)) {
            console.log(`Player ${currentPlayer} wins!`)
            console.log(printMatrix(matrix))
            return;
        } else if (input.length === 0 || isMatrixFilled(matrix)) {
            console.log("The game ended! Nobody wins :(");
            console.log(printMatrix(matrix))
            return;
        }

        function isPlaceTaken(row, col, matrix) {
            return matrix[row][col] === false;
        }

        function isAWin(matrix, currentPlayer) {
            let diagonalA = 0;
            let diagonalB = 0;
            let completeRow = 0;
            let completeCol = 0;

            for (let row = 0; row < matrix.length; row++) {
                diagonalA += matrix[row][row] === currentPlayer ? 1 : 0;
                diagonalB += matrix[row][matrix[row].length - row - 1] === currentPlayer ? 1 : 0;
                completeRow = matrix[row]
                    .reduce((acc, val) => {
                        acc += val === currentPlayer ? 1 : 0;
                        return acc;
                    }, 0);
                if (completeRow !== 3) {
                    completeRow = 0
                } else break;

                for (let col = 0; col < matrix[row].length; col++) {
                    completeCol += matrix[col][row] === currentPlayer ? 1 : 0;
                }
                if (completeCol !== 3) completeCol = 0;
            }

            return diagonalA === 3 || diagonalB === 3 || completeRow === 3 || completeCol === 3;
        }

        function printMatrix(matrix) {
            let result = '';
            for (let row = 0; row < matrix.length; row++) {
                result += matrix[row].join("\t") + "\n";
            }

            return result;
        }

        function isMatrixFilled(matrix) {    
            for (const row in matrix) {
                for (const col in matrix[row]) {
                    if(matrix[row][col] === false) return false;
                }
            }

            return true;
        }
    }
}

solve(["0 0",
    "0 0",
    "1 1",
    "0 1",
    "1 2",
    "0 2",
    "2 2",
    "1 2",
    "2 2",
    "2 1"]
)