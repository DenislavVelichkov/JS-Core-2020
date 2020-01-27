function solve(data) {
    let parsedData = data.reduce((db, componentData) => {
        let [systemName, componentName, subcomponentName] = componentData.split('|').map(x => x.trim());

        if (!db[systemName]) {
            db[systemName] = { [componentName]: [subcomponentName] };
            return db;
        }

        if (!db[systemName][componentName]) {
            db[systemName][componentName] = [subcomponentName];
            return db;
        }
        db[systemName][componentName] = [...db[systemName][componentName], subcomponentName];
        return db;
    }, {});

    let sortedSystems = Object.keys(parsedData).sort((a, b) => {
        let result = Object.keys(parsedData[b]).length - Object.keys(parsedData[a]).length;
        return result !== 0 ? result : a.localeCompare(b);

    });




    for (i = 0; i < sortedSystems.length; i++) {
        let currentSystem = sortedSystems[i];
        console.log(currentSystem);

        let sortedComponents = Object.keys(parsedData[currentSystem]).sort((a, b) => {
            let result = Object.keys(parsedData[currentSystem][b]).length - Object.keys(parsedData[currentSystem][a]).length;
            return result !== 0 ? result : a.localeCompare(b);
        });
        for (j = 0; j < sortedComponents.length; j++) {
            let currentComponent = sortedComponents[j];
            console.log(`|||${currentComponent}`);

            let subcomponents = Object.values(parsedData[currentSystem][currentComponent]);
            for (k = 0; k < subcomponents.length; k++) {
                console.log(`||||||${subcomponents[k]}`);
            }
        }

    }

}

solve(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'])