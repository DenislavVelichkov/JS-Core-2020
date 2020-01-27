function argumentsInfo(...args) {
    let metaData = new Map();

    for (const arg of args) {
        let currentType = typeof arg;
        console.log(`${currentType}: ${arg}`);

        if (metaData.get(currentType)) {
            metaData.set(currentType, metaData.get(currentType) + 1);
        } else {
            metaData.set(currentType, 1);
        }
        
    }

    [...metaData]
        .sort((a, b) => b[1] - a[1])
        .forEach(md => {
            console.log(`${md[0]} = ${md[1]}`);
        });
}

argumentsInfo('cat', 42, function () { console.log('Hello world!'); })