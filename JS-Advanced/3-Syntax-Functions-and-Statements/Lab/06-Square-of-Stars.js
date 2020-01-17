function solve(x) {
    if (x) { 
        for (let i = 0; i < x; i++) {
            let str = '* '.repeat(x);
            console.log(str.trim());  
        }
    } else {
        for (let i = 0; i < 5; i++) {
            let str = '* '.repeat(5);
            console.log(str.trim());
        }
    }
}