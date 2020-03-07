(() => {
  class Employee {
    constructor(name, age) {

      if (new.target === Employee) {
        throw new Error('Cannot instantiate directly')
      }

      this.name = name
      this.age = Number(age)
      this.salary = 0
      this.tasks = []
    }

    work() {
      let currentTask = this.tasks.shift()
      console.log(`${this.name} + ${currentTask}`)
      this.tasks.push(currentTask)
    }

    collectSalary() {
      console.log(`${this.name} received ${this.salary} this month`)
    }

  }

  class Junior extends Employee {
    constructor(name, age) {
      super(name, age)
      this.tasks = [` is working on a simple task.`]
    }
  }

  class Senior extends Employee {
    constructor(name, age) {
      super(name, age)
      this.tasks = [
        ` is working on a complicated task.`,
        ` is taking time off work.`,
        ` is supervising junior workers.`
      ]
    }
  }

  class Manager extends Employee {
    constructor(name, age) {
      super(name, age)
      this.dividend = 0
      this.tasks = [` scheduled a meeting.`, ` is preping a quarterly report.`]
    }

    collectSalary() {
      console.log(`${this.name} received ${this.salary + this.dividend} this month`)
    }
  }

  return {
    Employee,
    Junior,
    Senior,
    Manager
  }

})()