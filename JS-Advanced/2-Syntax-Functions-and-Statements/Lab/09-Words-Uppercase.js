function solve(str) { 
   let result = new Array(...String(str).match(/[A-Za-z0-9]+/g));
   let letters = '';
    result.forEach(element => {
        letters += element.toLocaleUpperCase() + ', ';
    });
    let end = letters.length - 2;

    return letters.slice(0, end);
}