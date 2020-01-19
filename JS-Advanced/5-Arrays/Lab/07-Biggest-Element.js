function solve(input) {
  let matrix = new Array(...input);
  let maxElement = Number.MIN_SAFE_INTEGER;
  let biggestElement = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let currentElement = matrix[row][col]

      if(currentElement > maxElement) {
        maxElement = currentElement;
        biggestElement = currentElement;
      }
      
    }
  }

  return biggestElement;
}

console.log(solve(
  [
    [20, 50, 10],
    [8, 33, 145]
  ]
))