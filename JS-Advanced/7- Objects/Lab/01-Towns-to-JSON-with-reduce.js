function solve(input) {
    let args = new Array(...input)
    let result = []

    args.slice(1, args.length)
        .reduce((acc, current) => {

        let [town, latitude, longitude] =
            new Array(...current
                .split('|')
                .filter(x => x !== ''))
                .map(el => el.trim())
        
        acc = {
            Town: town,
            Latitude: Number(parseFloat(latitude).toFixed(2)), 
            Longitude: Number(parseFloat(longitude).toFixed(2))
        }
        
        return result.push(acc)
    },[])

    return JSON.stringify(result)
}

console.log(solve(
    ['| Town | Latitude | Longitude |',
        '| Sofia | 42.696552 | 23.32601 |',
        '| Beijing | 39.913818 | 116.363625 |']
))