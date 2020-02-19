const { expect } = require("chai");
const { beforeEach } = require("mocha");

let PizzUni = require('../PizzUni');

describe('Tests', function () {
  let pizzUni;
  let user1;
  let user2;
  let user3;
  let fakePizza;
  let fakeDrink;

  beforeEach(function () {
    pizzUni = new PizzUni();

    user1 = {
      email: "pako@aa.aa",
      orderHistory: []
    };

    user2 = {
      email: "will@aa.aa",
      orderHistory: []
    };

    user3 = {
      email: "smith@aa.aa",
      orderHistory: []
    };

    fakePizza = "Pizza Mente";
    
  });

  describe('Test Constructor', () => {
    it('Test class properties', () => {
      expect(pizzUni.registeredUsers).deep.equal([]);
      expect(Object.keys(pizzUni.availableProducts).length).deep.equal(2);
      expect(pizzUni.availableProducts.pizzas.length).deep.equal(3);
      expect(pizzUni.availableProducts.drinks.length).deep.equal(3);
      expect(pizzUni.orders).deep.equal([]);
    });
  });

  describe('Test registerUser()', () => {
    it('Should return error when email is duplicated', () => {
      pizzUni.registeredUsers.push(user1);
      pizzUni.registeredUsers.push(user2);
      pizzUni.registeredUsers.push(user3);

      let result = () => pizzUni.registerUser(user1.email);

      expect(result).to.throw(Error, `This email address (${user1.email}) is already being used!`)
      expect(pizzUni.registeredUsers.length).deep.equal(3);
    });

    it('It should register user correctly', () => {
      let user4 = {
        email: "test@aa.aa",
        orderHistory: []
      }

      let result = pizzUni.registerUser("test@aa.aa");

      expect(result).deep.equal(user4);
      expect(pizzUni.registeredUsers.length).deep.equal(1);
    });
    
  });


  describe('Test makeAnOrder()', () => {
    it('Must throw error if user is not registered', () => {    
      let result = () => pizzUni.makeAnOrder(user1.email);

      expect(result).to.throw(Error, "You must be registered to make orders!");
    });

    it('Must throw error if no pizza is ordered and/or ordered pizza must match available ones', () => {
      pizzUni.registerUser(user1.email);
      let result = () => pizzUni.makeAnOrder(user1.email, fakePizza, null);

      expect(result).to.throw(Error, "You must order at least 1 Pizza to finish the order.");
    });

    it('Must throw error if no drinks are ordered and/or ordered drink must match available ones', () => {
      
    });

    it('Order Histroy must save the new order', () => {

    });

    it('Should return correct index of the order in the orders array', () => {
      pizzUni.registerUser(user1.email);
      let pizza = pizzUni.availableProducts.pizzas[0];
      let drink = pizzUni.availableProducts.drinks[0];

      let result = pizzUni.makeAnOrder(user1.email, pizza, drink);

      expect(result).deep.equal(0);
      expect(pizzUni.orders[result].email).deep.equal(user1.email)
    });
    
  });


  describe('Test detailsAboutMyOrder()', () => {
    it('Shoud return correct status of an order', () => {
      pizzUni.registerUser(user1.email);
      let pizza = pizzUni.availableProducts.pizzas[0];
      let drink = pizzUni.availableProducts.drinks[0];

      let result = pizzUni.makeAnOrder(user1.email, pizza, drink);

      expect(pizzUni.detailsAboutMyOrder(result)).deep.equal("Status of your order: pending")
    });
  });


  describe('Test doesTheUserExist()', () => {
    it('The method should return correct user', () => {
      pizzUni.registeredUsers.push(user1);
      pizzUni.registeredUsers.push(user2);
      pizzUni.registeredUsers.push(user3);
      
      let result = pizzUni.doesTheUserExist(user1.email);
      expect(result).deep.equal(user1);
    });
    it('The method should return undefined', () => {
      pizzUni.registeredUsers.push(user1);
      pizzUni.registeredUsers.push(user2);
      pizzUni.registeredUsers.push(user3);
      
      let result = pizzUni.doesTheUserExist("test@aa.aa");
      expect(result).equal(undefined);
    });
  });

  describe('Test completeOrder()', () => {

    it('Should change orders status correctly', () => {
      pizzUni.registerUser(user1.email);

      let pizza = pizzUni.availableProducts.pizzas[0];
      let drink = pizzUni.availableProducts.drinks[0];

      let orderIndex = pizzUni.makeAnOrder(user1.email, pizza, drink);

      let testOrder = pizzUni.orders[orderIndex];
      let completedOrder = pizzUni.completeOrder();

      expect(completedOrder.status).deep.equal(testOrder.status)
    });
  });

});