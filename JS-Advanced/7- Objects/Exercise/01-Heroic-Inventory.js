function solve(input) {
    return JSON.stringify(input.reduce((acc, heroString, indx, arr) => {
        let [name, level, items] = heroString.split(" / ");
        acc.push(
            {
                name,
                level: Number(level),
                items: items ? items.split(",").map(val => val.trim()) : []
            
            })
        return acc;
    }, []));
}

console.log(solve(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']
));