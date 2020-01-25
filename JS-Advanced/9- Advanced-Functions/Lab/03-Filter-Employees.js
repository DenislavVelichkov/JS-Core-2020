function solve(data, criteria) {
    let employees = JSON.parse(data);
    let criteriaParam = criteria.split("-")[0];
    let criteriaValue = criteria.split("-")[1];
    let orderCount = 0;

    employees
        .filter(employee => employee[criteriaParam] === criteriaValue)
        .forEach(el => {
            console.log(orderCount++
                +
                "."
                + ` ${el.first_name} ${el.last_name} - ${el.email}`);
        });
}

solve(`[{
    "id": "1","first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    'gender-Female'
)