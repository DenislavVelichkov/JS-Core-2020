class Company {
  constructor () {
    this._departments = []
  }

  get departments () {
    return this._departments
  }

  addEmployee (username, salary, position, department) {
    if (!(username && salary && position && department)) {
      throw new Error('Invalid input!')
    }

    if (salary < 0) {
      throw new Error('Invalid input!')
    }

    const employee = {
      name: username,
      salary,
      position
    }

    let dep = this.departments.find(d => d.name === department)

    if (!dep) {
      dep = {
        name: `${department}`,
        employees: []
      }
    }

    dep.employees.push(employee)
    this.departments.push(dep)

    return `New employee is hired. Name: ${username}. Position: ${position}`
  }

  bestDepartment () {
    let output = ''
    let maxAvgSalary = Number.MIN_SAFE_INTEGER
    let bestDepartment

    this.departments.forEach(d => {
      let highestAvgSalary = Array.from(d.employees).reduce(
        (acc, current) => acc + current.salary,
        0
      )
      highestAvgSalary /= d.employees.length

      if (highestAvgSalary > maxAvgSalary) {
        maxAvgSalary = highestAvgSalary
        bestDepartment = d
      }
    })

    bestDepartment.employees.sort((a, b) => {
      const sortResult = compareFn(b.salary, a.salary)
      return sortResult !== 0 ? sortResult : a.name.localeCompare(b.name)
    })

    output += `Best Department is: ${
      bestDepartment.name
    }\nAverage salary: ${Number(maxAvgSalary).toFixed(2)}\n`
    output += `${bestDepartment.employees
      .map(e => `${e.name} ${e.salary} ${e.position}`)
      .join('\n')}`

    return output

    function compareFn (a, b) {
      if (a > b) {
        return 1
      }
      if (a < b) {
        return -1
      }
      if (a === b) {
        return 0
      }
    }
  }
}

const c = new Company()
c.addEmployee('Stanimir', 2000, 'engineer', 'Construction')
c.addEmployee('Pesho', 1500, 'electrical engineer', 'Construction')
c.addEmployee('Slavi', 500, 'dyer', 'Construction')
c.addEmployee('Stan', 2000, 'architect', 'Construction')
c.addEmployee('Stanimir', 1200, 'digital marketing manager', 'Marketing')
c.addEmployee('Pesho', 1000, 'graphical designer', 'Marketing')
c.addEmployee('Gosho', 1350, 'HR', 'Human resources')
console.log(c.bestDepartment())
