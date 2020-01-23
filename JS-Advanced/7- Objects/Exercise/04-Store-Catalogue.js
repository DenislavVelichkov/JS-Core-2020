function solve(data) {
    let parsedData = data.reduce((acc, productLine) => {
        let [name, price] = productLine.split(":").map(val => val.trim());

        if (acc[name[0]]) {
            acc[name[0]] = [...acc[name[0]], productLine]
        } else {
            acc[name[0]] = [productLine]
        }
        return acc;
    }, {});
    Object.keys(parsedData)
        .sort()
        .map(val => {
            console.log(val);

            parsedData[val]
                .sort()
                .map(product => {
                    console.log(`${product.split(" : ").join(": ")}`);
                })
        })
}