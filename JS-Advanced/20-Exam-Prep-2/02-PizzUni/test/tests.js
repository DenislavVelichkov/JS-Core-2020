const { expect } = require("chai");
const { beforeEach } = require("mocha");

let PizzUni = require('../PizzUni');

describe('Tests', function () {
  let pizzUni;
  let user1;
  let user2;
  let user3;

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

    it('Should register user correctly', () => {
      let user4 = {
        email: "test@aa.aa",
        orderHistory: []
      }

      let result = pizzUni.registerUser("test@aa.aa");

      expect(result.email).deep.equal(user4.email);
    });
    
  });


  describe('Test makeAnOrder()', () => {
    it('', () => {

    });
  });


  describe('Test detailsAboutMyOrder()', () => {
    it('', () => {

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
    it('', () => {

    });5
  });

});