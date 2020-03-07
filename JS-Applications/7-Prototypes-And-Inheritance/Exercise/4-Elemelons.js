function solve() {
  class Melon {
    constructor(weight, melonSort) {

      if (new.target === Melon) {
        throw new TypeError("Abstract class cannot be instantiated directly");
      }

      this.weight = weight
      this.melonSort = melonSort
    }

    toString() {
      let output = `Element: ${new.target}\n`
        + `Sort: ${this.melonSort}\n`
        + `Element Index: ${this.elementIndex}`

      return output
    }

    // get melonSort() {
    //   return this.melonSort
    // }

    // set melonSort(sortType) {
    //   this.melonSort = sortType
    // }

  }

  class Watermelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort)
      this.elementIndex = this.weight * melonSort.length
    }

  }

  class Firemelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort)
      this.elementIndex = this.weight * melonSort.length

    }

  }

  class Earthmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort)
      this.elementIndex = this.weight * melonSort.length

    }

  }

  class Airmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort)
      this.elementIndex = this.weight * melonSort.length
    }

  }

  class Melolemonmelon extends Watermelon {
    constructor(weight, melonSort) {
      super(weight, melonSort)
      this.elementIndex = 3
      this.elements = ['Fire', 'Earth', 'Air', 'Water']

    }

    morph() {
        this.elementIndex++

        if ( this.elementIndex >= this.elements.length) {
          this.elementIndex = 0
        }

      return this.elements[ this.elementIndex]
    }

  }

  return {
    Melon,
    Watermelon,
    Firemelon,
    Earthmelon,
    Airmelon,
    Melolemonmelon
  }

}

let melons = solve()
let newMelon = new melons.Watermelon(12, 'asd')
console.log(newMelon)