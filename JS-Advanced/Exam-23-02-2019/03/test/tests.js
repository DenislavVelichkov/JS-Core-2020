const { expect } = require("chai");
const { beforeEach } = require("mocha");
let Parser = require("../solution.js");

describe("MyTests", () => {
    let parser;

    beforeEach(function () {
        parser = new Parser();
    }) 

    describe('Test Constructor', () => {
        it('constructor()', () => {
            let data = "getData";

            expect(parser.data).deep.equal(JSON.parse(data))
        });
    });

    describe('Test Constructor', () => {
        it('Test class properties', () => {
            
        });
    });

    describe('Test Constructor', () => {
        it('Test class properties', () => {
            
        });
    });

    describe('Test Constructor', () => {
        it('Test class properties', () => {
            
        });
    });

    describe('Test Constructor', () => {
        it('Test class properties', () => {
            
        });
    });

    describe('Test Constructor', () => {
        it('Test class properties', () => {
            
        });
    });
});