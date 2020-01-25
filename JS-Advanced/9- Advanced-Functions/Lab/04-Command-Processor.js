function solution() {
    let result = '';

    return (function (param) {
        
        return {
            append: (param) => result += param,
            removeStart: (param) => result = result.substr(Number(param), result.length),
            removeEnd: (param) => result = result.substr(0, result.length - Number(param)),
            print: () => console.log(result)
        }  
    })()
}

let firstZero = solution();

firstZero.append('hello');
firstZero.append('again');
firstZero.removeStart(3);
firstZero.removeEnd(4);
firstZero.print()

let secondZeroTest = solution();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();
