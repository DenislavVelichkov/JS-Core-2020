function solve(input) {
    let cars = new Map();

    input.forEach(element => {
      let [carBrand, carModel, producedCars] = element.split(" | ");

      if (cars.has(carBrand)) {
        if (cars.get(carBrand).has(carModel)) {
          cars.get(carBrand).set(carModel, cars.get(carBrand).get(carModel) + Number(producedCars));
        } else {
          cars.get(carBrand).set(carModel, Number(producedCars));
        }
      } else {
        let modelsAndTotalSold = new Map();
        modelsAndTotalSold.set(carModel, Number(producedCars));
        cars.set(carBrand, modelsAndTotalSold);
      }  
    });
    
  for (let [brand, models] of cars) {
    console.log(`${brand}`);
    for (let [model, totalSold] of models) {
      console.log(`###${model} -> ${totalSold}`);
    }
  }

}

console.log(solve(
  [ 'Mercedes-Benz | 50PS | 123',
    'Mini | Clubman | 20000',
    'Mini | Convertible | 100',
    'Mercedes-Benz | 60PS | 300',
    'Hyunday | Elantra GT | 2000',
    'Mini | Countryman | 10',
    'Mercedes-Benz | W210 | 10',
    'Mini | Clubman | 100',
    'Mercedes-Benz | W163 | 20']));