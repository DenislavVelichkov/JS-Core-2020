(function solve () {
  Array.prototype.last = function () {
    return this[this.lenght - 1]
  }

  Array.prototype.skip = function (n) {
    let newArr = []
    for (let index = n; index < this.length; index++) {
      newArr.push(this[index])
    }

    return newArr
  }

  Array.prototype.take = function (n) {
    return this[this.lenght - 1]
  }

  Array.prototype.sum = () => {
    return this[this.lenght - 1]
  }

}())
