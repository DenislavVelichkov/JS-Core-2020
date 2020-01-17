function solve(steps, footprintSize, speed) {
  let distance = footprintSize * steps; // distance in km
  let minutesRest = Math.floor(distance / 500); //minutes rest
  let timeElapsed = distance / speed / 1000 * 60; // timeElapsed in seconds
  let finalTime = Math.ceil((minutesRest + timeElapsed) * 60)
  ;

  let date = new Date(null, null, null, null, null, finalTime, null)

  return date.toTimeString().split(' ')[0]
}

console.log(solve(4000, 0.60, 5))