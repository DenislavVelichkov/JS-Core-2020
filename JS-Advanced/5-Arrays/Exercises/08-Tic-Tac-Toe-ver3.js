function solve(moves) {
    const chWinner = (p, b, f) =>
        (f(b[0], p) || f(b[1], p) || f(b[2], p)
            || f(b.map(x => x[0]), p)
            || f(b.map(x => x[1]), p)
            || f(b.map(x => x[2]), p)
            || f(b.map((x, i) => x[i]), p)
            || f(b.map((x, i) => x[b.length - 1 - i]), p))
            ? true : false;
    const initBoard = () => Array.from(Array(3), () => new Array(false, false, false));
    const hasMove = (a) => a.some(row => row.some(x => x === false));
    const swapPlayers = (a) => (a === 'X') ? 'O' : 'X';
    const getResult = (a, b) => a.every(x => x === b);
    let curPl = 'X';
    let board = initBoard();
    let winner;
    while (hasMove(board) && moves.length) {
        let cMove = moves.shift().split(" ");
        if (!board[cMove[0]][cMove[1]]) board[cMove[0]][cMove[1]] = curPl;
        else {
            console.log("This place is already taken. Please choose another!");
            continue;
        }
        if (chWinner(curPl, board, getResult)) {
            winner = curPl;
            break;
        }
        curPl = swapPlayers(curPl);
    }
    console.log((!winner)
        ? "The game ended! Nobody wins :("
        : `Player ${winner} wins!`);
    board.map(x => console.log(x.join("\t")));
}