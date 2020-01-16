/**
 * Receives two string arguments and parse them as numbers. Use Number(string)
 * function or just put the '+' sign before the string.
 * @param {string} num1 
 * @param {string} num2 
 */
function solve(num1, num2) {
  let a = Number(num1); // 1st method to parse.
  let b = +num2         // 2nd method to parse num.
  let result = 0;
  for (let i = a; i <= b; i++) {
    result += i;
  }

  return result;
}

console.log(solve('1','5'))