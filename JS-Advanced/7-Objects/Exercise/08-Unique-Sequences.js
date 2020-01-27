function solve(params) {
    let unique = new Map();

    for (const row of params) {
        let arr = JSON.parse(row).sort((a, b) => b - a);
        let stringified = `[${arr.join(', ')}]`;
        unique.set(stringified, arr.length);
    }

    let result = [...unique]
        .sort((a, b) => a[1] - b[1])
        .map(kvp => kvp[0])
        .join('\n');

    return result;
}

solve(
    ["[-3, -2, -1, 0, 1, 2, 3, 4]",
        "[10, 1, -17, 0, 2, 13]",
        "[4, -3, 3, -2, 2, -1, 1, 0]"]

);