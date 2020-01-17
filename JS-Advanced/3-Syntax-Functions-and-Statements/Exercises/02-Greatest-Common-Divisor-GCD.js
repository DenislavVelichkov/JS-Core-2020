function gcd(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) {return} 
  let x = Math.abs(x);
  let y = Math.abs(y);
  while(y) {
    let tempValue = y;
    y = x % y;
    x = tempValue;
  }

  return x;
}