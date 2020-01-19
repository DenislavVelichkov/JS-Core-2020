function solve(input) {
  let matrix = new Array(...input);
  let sum = 0;
  let result = [];

  for (let row = 0; row < matrix.length; row++) {
      let currentElement = matrix[row][col = row]
      sum += currentElement;
  }

  result.push(sum);
  sum = 0;

  let negativeCol = 0;
  for (let row = matrix.length - 1; row >= 0 ; row--) {
    let currentElement = matrix[row][negativeCol++]
    sum += currentElement;
  }

  result.push(sum);

  return result.join(' ');
}

console.log(solve(
  [[20, 40],
 [10, 60]]
))