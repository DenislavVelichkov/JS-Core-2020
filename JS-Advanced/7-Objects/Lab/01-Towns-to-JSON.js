function solve(input) {
    let args = new Array(...input);
    let result = [];
    
    while(args.slice(1, args.length).length !== 0) {
        let [town, latitude, longitude]= new Array(...args.pop()
                                .split('|')
                                .filter(x => x !== ''))
                                .map(el => {
                                    x = el.trim();
                                    return x;
                                });

        result.push({
            Town: town,
            Latitude: Number(parseFloat(latitude).toFixed(2)),
            Longitude: Number(parseFloat(longitude).toFixed(2))
        });
    }

    return JSON.stringify(result.reverse());
}

console.log(solve(
    ['| Town | Latitude | Longitude |',
        '| Sofia | 42.696552 | 23.32601 |',
        '| Beijing | 39.913818 | 116.363625 |']
));
