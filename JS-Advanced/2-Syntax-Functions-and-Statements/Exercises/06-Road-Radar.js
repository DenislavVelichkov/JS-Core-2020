function solve(args) {
  const currentSpeed = args[0];
  const area = args[1];
  
  const motorway = 130;
  const interstate = 90;
  const city = 50;
  const residential = 20;
  let result;

  switch(area) {
    case 'motorway':
    if(currentSpeed > motorway && currentSpeed <= 150) {
      result = 'speeding'
    } else if (currentSpeed > 150 && currentSpeed <= 170) {
      result = 'excessive speeding'
    } else if (currentSpeed > 170) {
      result = 'reckless driving'
    }

    break;
    case 'interstate':
      if (currentSpeed > interstate && currentSpeed <= 150) {
        result = 'speeding'
      } else if (currentSpeed > 150 && currentSpeed <= 170) {
        result = 'excessive speeding'
      } else if (currentSpeed > 170) {
        result = 'reckless driving'
      }

      break;
    case 'city':
      if (currentSpeed > city && currentSpeed <= 70) {
        result = 'speeding'
      } else if (currentSpeed > 70 && currentSpeed <= 90) {
        result = 'excessive speeding'
      } else if (currentSpeed > 90) {
        result = 'reckless driving'
      }

      break;
    case 'residential':
      if (currentSpeed > residential && currentSpeed <= 40) {
        result = 'speeding'
      } else if (currentSpeed > 40 && currentSpeed <= 60) {
        result = 'excessive speeding'
      } else if (currentSpeed > 60) {
        result = 'reckless driving'
      }

      break;
  }

  return result;
}

console.log(solve([21, 'residential']))