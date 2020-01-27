/* Euclid’s Algorithm - Greatest Common Divisor */

/* Reminder Implementation */
function printGreatestCommonDivisor(firstNumber, secondNumber) {
    let temp = 0;

    while (secondNumber != 0) {
        temp = secondNumber;
        secondNumber = firstNumber % secondNumber;
        firstNumber = temp;
    }

    return firstNumber;
}

/* Original - Division Implementation */
function printGreatestCommonDivisor(firstNumber, secondNumber) {
    while (firstNumber != secondNumber) {
        if (firstNumber > secondNumber) {
            firstNumber -= secondNumber;
        } else {
            secondNumber -= firstNumber;
        }
    }

    return firstNumber;
}