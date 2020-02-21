const { expect } = require("chai");
const { beforeEach } = require("mocha");

const PizzUni = require('../PizzUni');

describe('Tests', function () {
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
    fakeDrink = "Mytenica";
  });

  describe('Test Constructor', () => {
    it('Test class properties', () => {
      expect(pizzUni.registeredUsers).deep.equal([]);
      expect(pizzUni.availableProducts).deep.equal({
        pizzas: ['Italian Style', 'Barbeque Classic', 'Classic Margherita'],
        drinks: ['Coca-Cola', 'Fanta', 'Water']
      });
      expect(pizzUni.orders).deep.equal([]);
    });
  });

  describe('Test registerUser()', () => {
    it('Should return error when email is duplicated', () => {
      pizzUni.registerUser(user1.email);
      pizzUni.registerUser(user2.email);
      pizzUni.registerUser(user3.email);

      const result = () => pizzUni.registerUser(user1.email);

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
      expect(pizzUni.registeredUsers[0]).deep.equal(user4);
    });

  });

  describe('Test makeAnOrder()', () => {
    it('Must throw error if user is not registered', () => {
      let result = () => pizzUni.makeAnOrder(user1.email, 'Italian Style', 'Coca-Cola');

      expect(result).to.throw(Error, "You must be registered to make orders!");
    });

    it('Must throw error if no pizza is ordered and/or ordered pizza must match available ones', () => {
      pizzUni.registerUser(user1.email);

      let result = () => pizzUni.makeAnOrder(user1.email, fakePizza, "Fanta");

      expect(result).to.throw(Error, "You must order at least 1 Pizza to finish the order.");
    });

    it('Must return order with a drink', () => {
      pizzUni.registerUser(user1.email);

      let result = pizzUni.makeAnOrder(user1.email, 'Italian Style', 'Coca-Cola');

      let userOrder = {
        orderedPizza: 'Italian Style',
        orderedDrink: 'Coca-Cola'
      };

      expect(pizzUni.orders[result]).deep.equal({
        ...userOrder,
        email: user1.email,
        status: 'pending'
      });
      expect(pizzUni.orders.length).deep.equal(1);
      expect(pizzUni.orders[0].orderedDrink).to.equal('Coca-Cola');
      expect(pizzUni.registeredUsers[0].orderHistory).to.deep.equal([{
        orderedDrink: 'Coca-Cola',
        orderedPizza: 'Italian Style'
      }]);
    });

    it('Must return order index', () => {
      pizzUni.registerUser(user1.email);

      let result = pizzUni.makeAnOrder(user1.email, 'Italian Style', 'Coca-Cola');

      expect(result).deep.equal(0);
    });

    it('Must return correct user order', () => {
      pizzUni.registerUser(user1.email);
      let user = pizzUni.doesTheUserExist(user1.email);

      pizzUni.makeAnOrder(user1.email, 'Italian Style', 'Coca-Cola');

      let userOrder = {
        orderedPizza: 'Italian Style',
        orderedDrink: 'Coca-Cola'
      };

      expect(user.orderHistory[0]).deep.equal(userOrder);
      expect(user.orderHistory.length).deep.equal(1);
    });

  });

  describe('Test detailsAboutMyOrder()', () => {
    it('Shoud return correct status of an order', () => {
      pizzUni.registerUser(user1.email);
      pizzUni.makeAnOrder(user1.email, 'Italian Style', 'Coca-Cola');
      pizzUni.completeOrder();
      pizzUni.makeAnOrder(user1.email, 'Barbeque Classic', 'Water');
      pizzUni.completeOrder();
      pizzUni.makeAnOrder(user1.email, 'Italian Style', 'Fanta');

      let compl = pizzUni.detailsAboutMyOrder(1);
      let pend = pizzUni.detailsAboutMyOrder(2);

      expect(compl).deep.equal("Status of your order: completed")
      expect(pend).deep.equal("Status of your order: pending")
    });

    it('Test completed functionality', () => {
      const result = pizzUni.detailsAboutMyOrder(0);

      expect(result).to.equal(undefined);
    });

    
  });

  describe('Test doesTheUserExist()', () => {
    it('The method should return correct user', () => {
      pizzUni.registerUser(user1.email);
      pizzUni.registerUser(user2.email);
      pizzUni.registerUser(user3.email);

      let result = pizzUni.doesTheUserExist(user1.email);
      expect(result).deep.equal(pizzUni.registeredUsers[0]);
    });

    it('The method should return undefined', () => {
      pizzUni.registerUser(user1.email);
      pizzUni.registerUser(user2.email);
      pizzUni.registerUser(user3.email);

      let result = pizzUni.doesTheUserExist("test@aa.aa");
      expect(result).equal(undefined);
    });
  });

  describe('Test completeOrder()', () => {

    it('Should change orders status correctly', () => {
      pizzUni.registerUser(user1.email);

      let userOrder = {
        orderedPizza: 'Barbeque Classic',
        orderedDrink: 'Water'
      };

      let order = {
        ...userOrder,
        email: user1.email,
        status: 'completed'
      };

      pizzUni.makeAnOrder(user1.email, 'Italian Style', 'Coca-Cola');
      pizzUni.makeAnOrder(user1.email, 'Barbeque Classic', 'Water');
      pizzUni.makeAnOrder(user1.email, 'Italian Style', 'Fanta');
      pizzUni.completeOrder();

      let completedOrder = pizzUni.completeOrder();

      expect(completedOrder).deep.equal(order);
    });
  });

});