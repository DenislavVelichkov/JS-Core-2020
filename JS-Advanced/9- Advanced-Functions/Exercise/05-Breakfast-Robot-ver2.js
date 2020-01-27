function solution() {

    const products = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    };

    return function breakfastRobot(input) {
        const [command, currentProduct, amount] = input.split(' ');

        const recepiesMenu = {
            apple: {
                carbohydrate: 1,
                flavour: 2,
            },
            lemonade: {
                carbohydrate: 10,
                flavour: 20,
            },
            burger: {
                carbohydrate: 5,
                fat: 7,
                flavour: 3,
            },
            eggs: {
                protein: 5,
                fat: 1,
                flavour: 1,
            },
            turkey: {
                protein: 10,
                carbohydrate: 10,
                fat: 10,
                flavour: 10,
            },
        };

        function restock(product, quantity) {
            (products[product] += Number(quantity));
            return 'Success';
        }

        function prepare(recepie, quantity) {
            const ingredientsNeeded = JSON.parse(
                JSON.stringify(recepiesMenu[recepie]),
            );
            let canMake = true;
            const missingIngredients = [];

            Object.keys(ingredientsNeeded).forEach(ingredient => {
                if (
                    products[ingredient] <
                    ingredientsNeeded[ingredient] * quantity
                ) {
                    missingIngredients.push(ingredient);
                    canMake = false;
                }
            });

            if (canMake) {
                Object.keys(ingredientsNeeded).forEach(ingredient => {
                    products[ingredient] -=
                        ingredientsNeeded[ingredient] * quantity;
                });

                return 'Success';
            }

            return `Error: not enough ${missingIngredients[0]} in stock`;
        }

        function report(obj) {
            const currentReport = Object.entries(obj).reduce((acc, value) => {
                acc.push(`${value[0]}=${value[1]}`);

                return acc;
            }, []);

            return currentReport.join(' ');
        }

        if (command === 'restock') {
            return restock(currentProduct, amount);
        } else if (command === 'prepare') {
            return prepare(currentProduct, amount);
        } else {
            return report(products);
        }
    };
}

let manager = solution();

console.log(manager('prepare turkey 1'))
console.log(manager('restock protein 10'))
console.log(manager('prepare turkey 1'))
console.log(manager('restock carbohydrate 10'))
console.log(manager('prepare turkey 1'))
console.log(manager('restock fat 10'))
console.log(manager('prepare turkey 1'))
console.log(manager('restock flavour 10'))
console.log(manager('prepare turkey 1'))
console.log(manager('report'))