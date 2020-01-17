function solve(x) { 
    if(typeof(x) === 'number') {
        return (Math.pow(x, 2) * Math.PI).toFixed(2);
    } else {
        return `We can not calculate the circle area, because we receive a ${typeof(x)}.`
    }
}