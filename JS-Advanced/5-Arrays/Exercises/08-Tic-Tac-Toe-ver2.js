function solution(moves) {
    let field = [[false, false, false],
    [false, false, false],
    [false, false, false]];

    let players = ["X", "O"];

    for (let i = 0; i < moves.length; i++) {
        const element = moves[i];
        const row = element.split(' ')[0];
        const col = element.split(' ')[1];

        if (field[row][col] != false) {
            console.log("This place is already taken. Please choose another!");
            continue;
        }

        player = players.shift();
        players.push(player);

        field[row][col] = player;

        if (someoneWins(field, row, col)) {
            console.log(`Player ${player} wins!`)
            field.forEach(x => {
                console.log(x.join("\t"));
            });
            return;
        }

        if (field.some(row => row.includes(false))) {
            continue;
        }

        break;
    }

    console.log("The game ended! Nobody wins :(");
    field.forEach(x => {
        console.log(x.join("\t"));
    });

    function someoneWins(field, row, col) {
        return colCheck(field, col) || rowCheck(field, row) || leftDiagonalCheck(field) || rightDiagonalCheck(field);

        function colCheck(field, col) {
            return field[0][col] === field[1][col] && field[1][col] === field[2][col] && field[2][col] !== false;
        }

        function rowCheck(field, row) {
            return field[row][0] === field[row][1] && field[row][1] === field[row][2] && field[row][2] !== false;
        }

        function leftDiagonalCheck(field) {
            return field[0][0] == field[1][1] && field[1][1] == field[2][2] && field[2][2] !== false;
        }

        function rightDiagonalCheck(field) {
            return field[2][0] == field[1][1] && field[1][1] == field[0][2] && field[0][2] !== false;
        }
    }
}