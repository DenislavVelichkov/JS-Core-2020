function solution() {
    
    const meals = {
        apple: { carbohydrate: 1, flavour: 2 },
        lemonade: { carbohydrate: 10, flavour: 20 },
        burger: { carbohydrate: 5, fat: 7, flavour: 3 },
        eggs: { protein: 5, fat: 1, flavour: 1 },
        turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }
    };

    let el = { protein: 0, carbohydrate: 0, fat: 0, flavour: 0 };

    const commands = {
        restock: (a, b) => {
            el[a] += Number(b);
            return 'Success';
        },
        prepare: (a, b) => {
            let reqProd = Object.keys(meals[a])
                .map(x => (meals[a][x] * b <= el[x]) ? true : x);
            if (reqProd.every(x => x === true)) {
                for (let key in meals[a]) {
                    el[key] -= meals[a][key] * b;
                }
                return 'Success';
            }
            else return `Error: not enough ${reqProd.find(x => x !== true)} in stock`;
        },
        report: () => Object.keys(el).map(x => `${x}=${el[x]}`).join(" ")
    };

    return function (command) {
        let cmdTokens = command.split(' ');
        let cmd = commands[cmdTokens[0]];
        if (cmd) return cmd(cmdTokens[1], cmdTokens[2]);
        else return 'Error: Command does not exists!';
    }
}