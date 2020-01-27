function reduceFuncParams(currencyFormatter) {
    let separator = ",";
    let symbol = "$";
    let firstSymbol = true;
    let formatter =
     value => currencyFormatter(separator, symbol, firstSymbol, value);

    return formatter;
}

function currencyFormatter(separator, symbol, firstSymbol, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);
    if (firstSymbol) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

let dollarFormatter = reduceFuncParams(currencyFormatter);
console.log(dollarFormatter(5345));   // $ 5345,00
console.log(dollarFormatter(3.1429)); // $ 3,14
console.log(dollarFormatter(2.709));  
