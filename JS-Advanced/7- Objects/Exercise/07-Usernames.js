function solve(input) {
    return input
        .filter((value, indx, arr) => arr.indexOf(value) === indx)
        .sort((a, b) => (a.length - b.length !== 0) ? a.length - b.length
            : a < b ? -1
                : a > b ? 1
                    : 0)
        .join('\n');
}



console.log(solve(['Denise',
    'Ignatius',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot']
));