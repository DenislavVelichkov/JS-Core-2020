function solve(x) {
  let strArr = x.toString().split('');
  let sum = 0;
  let controlValue = parseInt(strArr[0]);
  let flag = true;

  for (let index = 0; index < strArr.length; index++) {
    sum += parseInt(strArr[index]);
  }
  
  for (let i = 1; i < strArr.length; i++) {

    if (controlValue !== parseInt(strArr[i])) {
      flag = false;
      break;
    }
  }

  console.log(flag);
  console.log(sum);
}

solve(2222222)