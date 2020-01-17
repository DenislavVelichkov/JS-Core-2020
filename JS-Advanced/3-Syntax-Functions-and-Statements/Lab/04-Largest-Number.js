function solve(num1, num2, num3) {
    if (num1 >= num2 && num1 >= num3) {
        return `The largest number is ${num1}.`;
    } else if (num2 >= num1 && num2 >= num3) {
        return `The largest number is ${num2}.`;
    } else {
        return `The largest number is ${num3}.`;
    }
}