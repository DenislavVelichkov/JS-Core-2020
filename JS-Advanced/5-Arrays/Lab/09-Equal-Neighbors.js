function solve(input) {
  const matrix = new Array(...input);
  let duplicates = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let currentElement = matrix[row][col];

      duplicates += isMatch(
                            row,
                            col,
                            matrix,
                            currentElement,
                            isInBounds)
    }

  }

  function isMatch(row, col, matrix, currentElement) {
    let counter = 0;

    if (isInBounds(row + 1, col, matrix)) {
      if (currentElement === matrix[row + 1][col]) {

        counter++;
      }
    }

    if (isInBounds(row, col - 1, matrix)) {
      if (currentElement === matrix[row][col - 1]) {

        counter++;
      }
    }

    return counter;
  }

  function isInBounds(row, col, matrix) {

    return row >= 0 && row <= matrix.length - 1
      && col >= 0 && col <= matrix[row].length - 1

  }

  return duplicates;
}

console.log(solve(
  [
    ['2', '2', '5', '7', '4'],
    ['4', '0', '5', '3', '4'],
    ['2', '5', '5', '4', '2']
  ]
))