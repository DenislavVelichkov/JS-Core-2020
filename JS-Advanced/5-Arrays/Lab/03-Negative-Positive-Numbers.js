function solve(args) {
    let arr = new Array(...args);
    let newArr = new Array();
     while(arr.length != 0){
        let tempVal = parseInt(arr.shift());

        if(tempVal >= 0) {
            newArr.push(tempVal);
        } else {  
            newArr.unshift(tempVal);   
        }
    }

    return newArr.join('\n');
}

console.log(solve([7, -2, 8, 9]))

