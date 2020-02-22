class ChristmasDinner {
  constructor(budget) {
    this.budget = Number(budget);
    this.dishes = [];
    this.products = [];
    this.guests = {};
  }

  get budget() {
    return this._budget;
  }

  set budget(budget) {

    if (budget < 0) {
      throw new Error("The budget cannot be a negative number");
    }

    this._budget = budget;
  }

  shopping(product) {
    let [type, price] = product; //remove destructuring later

    if (price > this.budget) {
      throw new Error("Not enough money to buy this product");
    }

    this.budget -= price;
    this.products.push(type);

    return `You have successfully bought ${type}!`;
  }

  recipes(recipe) {
    let recipeName = recipe.recipeName;
    let productsList = recipe.productsList;
    // let doAllProductsPresent = this.canWePrepareDish(recipe);
    let doAllProductsPresent = productsList.every(product => this.products.includes(product));

    if (!doAllProductsPresent) {
      throw new Error("We do not have this product");
    }

    this.dishes.push({ recipeName, productsList });

    return `${recipeName} has been successfully cooked!`;
  }

  inviteGuests(name, dish) {
    let dishToFind = this.dishes.find(d => d.recipeName === dish);

    if (!dishToFind) {
      throw new Error("We do not have this dish");
    }

    if (this.guests[name]) {
      throw new Error("This guest has already been invited");
    }

    this.guests[`${name}`] = dish;

    return `You have successfully invited ${name}!`
  }

  showAttendance() {
    let result = "";

    Object.keys(this.guests).forEach(k => 
      result += `${k} will eat ${this.guests[k]}, which consists of`
      + ` ${this.dishes.find(d => d.recipeName === this.guests[k]).productsList.join(", ")}\n`);

    return result.trim();
  }

  canWePrepareDish(recipe) {
    let isProductPresent = true;

    Array.from(recipe.productsList).forEach(p => {
      if (!this.products.find(product => product.type === p)) {
        isProductPresent = false
      }
    });

    return isProductPresent;

  }
}
