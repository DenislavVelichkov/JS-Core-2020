function solve(input) {
  let matrix = new Array(...input);
  let dupeCounter = 0;

  for (let row = 0; row < matrix[0].length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let currentElement = matrix[row][col];

      if (isMatch(
        row,
        col,
        matrix,
        currentElement,
        isInBounds)) {

        dupeCounter++;
      }
    }

  }

  function isMatch(row, col, matrix, currentElement) {

    if (isInBounds(row + 1, col, matrix)) {
      if (currentElement === matrix[row + 1][col]) {

        return true;

      }
    }

    if (isInBounds(row, col - 1, matrix)) {
      if (currentElement === matrix[row][col - 1]) {

        return true;
      }
    }

    return false;
  }

  function isInBounds(row, col, matrix) {

    return row >= 0 && row <= matrix[0].length - 1
      && col >= 0 && col <= matrix[0][row].length - 1

  }

  return dupeCounter;
}

console.log(solve(
  [['2', '2', '5', '7', '4',
    '4', '0', '5', '3', '4',
    '2', '5', '5', '4', '2']]
))