function solve(input) {
    let args = new Array(...input);
    let towns = 
    args.reduce((acc, currentValue, indx, array) => {
    
        if (acc.hasOwnProperty(array[indx - 1])) {
            acc[array[indx - 1]] += parseInt(currentValue);
        } else if (acc[currentValue]) { //acc.hasOwnProperty(currentValue) returns true/false as well as acc[currentValue] !!!
            return acc;
        } else {
            /**
             * JSON doesn't recognize below
             */
            // Object.defineProperty(acc, currentValue, { 
            //     value: 0,
            //     writable: true       
            // });
            acc[currentValue] = 0; 
        }

        return acc;
    }, {});

    return JSON.stringify(towns);
}

console.log(solve(
    ['Sofia',
        '20',
        'Varna',
        '3',
        'Sofia',
        '5',
        'Varna',
        '4']
));