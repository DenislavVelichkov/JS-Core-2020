const { expect } = require("chai");
const { assert } = require("chai");
const { beforeEach } = require("mocha");

let PizzUni = require('../PizzUni');

describe('Tests', function () {
  let pizzUni;

  beforeEach(function () {
    pizzUni = new PizzUni();
  });

  describe('Test Constructor', () => {
    it('Test class properties', () => {
      expect(pizzUni.registeredUsers).deep.equal([]);
      expect(Object.keys(pizzUni.availableProducts).length).deep.equal(2);
      expect(pizzUni.orders).deep.equal([]);
    });
  });

})