function solve (args) {
    let functions = {
        chop: (x) => x / 2,
        dice: (x) => Math.sqrt(x),
        spice: (x) => x + 1,
        bake: (x) => x * 3,
        fillet: (x) => x * 0.8
    }

    let num = args[0];
   
    for (let i = 1; i < args.length; i++) {
        num = functions[args[i]](num)
        console.log(num)
    }
}