function solution(param) {
    let result = '';
    let commands = {
        append: (param) => result += param,
        removeStart: (param) => result = result.slice(0, Number(param)),
        removeEnd: (param) => result = result.substr(result.length - 1 - Number(param), result.length),
        print: () => console.log(result)
    }

    return commands;
}

let firstZeroTest = solution();
firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
