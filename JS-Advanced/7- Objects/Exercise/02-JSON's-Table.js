function solve(input) {
    let parsedData = input.map(val => JSON.parse(val));
    let indent = "  ";
    let createTable = params => `<table>${params}\n</table>`;
    let createRow = params => `\n${indent}<tr>${params}\n${indent}</tr>`;
    let createBody = params => `\n${indent}${indent}<td>${params}</td>`;
    let result = parsedData.reduce((acc, currentRow) => {
        let tdForPerson = Object.values(currentRow)
        .reduce((tdAcc, currentVal) => {
            return tdAcc + createBody(currentVal);
        },"")

        return acc + createRow(tdForPerson);
    }, "")

    return createTable(result);
}

console.log(solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}']

));