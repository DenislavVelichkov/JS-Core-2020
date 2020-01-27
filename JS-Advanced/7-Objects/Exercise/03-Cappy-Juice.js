function solve(input) {
    let data = input.reduce((juiceAcc, juiceKVP) => {
        let [juiceName, quantity] = juiceKVP.split(" => ");

        if (juiceAcc.currentJuiceQuantity[juiceName]) {
            juiceAcc.currentJuiceQuantity[juiceName] += +quantity;
        } else {
            juiceAcc.currentJuiceQuantity[juiceName] = +quantity;
        }

        let bottleQuantity = Math.floor(juiceAcc.currentJuiceQuantity[juiceName] / 1000);

        if (bottleQuantity > 0 && !juiceAcc.completedJuice.includes(juiceName)) {
            juiceAcc.completedJuice.push(juiceName);
        }

        return juiceAcc;
    }, { completedJuice: [], currentJuiceQuantity: {} });

    data.completedJuice.map(juice => {
        console.log(`${juice} => ${Math.floor(data.currentJuiceQuantity[juice] / 1000)}`)
    });
}

solve(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']
);