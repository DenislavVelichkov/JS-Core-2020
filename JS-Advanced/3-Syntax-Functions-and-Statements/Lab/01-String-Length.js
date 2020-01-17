function solve(arg1, arg2, arg3) {
    let sumLenght;
    let averageLength;

    let fistArgumentLength = arg1.length;
    let secondArgumentLength = arg2.length;
    let thirdArgumentLength = arg3.length;
    sumLenght = fistArgumentLength + secondArgumentLength + thirdArgumentLength;
    averageLength = Math.floor(sumLenght / 3) ;

    console.log(sumLenght); 
    console.log(averageLength); 
}