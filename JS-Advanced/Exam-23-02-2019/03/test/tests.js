const { expect } = require("chai");
const { beforeEach } = require("mocha");

let Parser = require("../solution");

describe("MyTests", () => {
    let parser;

    beforeEach(function () {
        parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
    })

    describe('Test Constructor', () => {
        it('constructor()', () => {
            let data = JSON.parse('[{ "Nancy": "architect" }, { "John": "developer" }, { "Kate": "HR" }]')
            let result = parser._addToLog()

            expect(parser.data).deep.equal(data)
            expect(parser._log).deep.equal([ '0: undefined', '1: getData' ])
            expect(result).deep.equal("Added to log")
        });

        it('test print()', () => {
            let result = parser.print("print");

            expect(result).deep.equal('id|name|position\n0|Nancy|architect\n1|John|developer\n2|Kate|HR')
        });
    });

    describe('test addEntries(', () => {
        it('Test add', () => {
            let result = parser.addEntries("Steven:tech-support Edd:administrator")

            expect(result).deep.equal('Entries added!')
            expect(parser._log).deep.equal([ '0: addEntries' ])
        });

        it('Test remove error', () => {
            let result = () => parser.removeEntry("Pesho")

            expect(result).to.throw(Error, 'There is no such entry!')
        });

        it('Test remove correct', () => {
           
            let result = parser.removeEntry("Kate")

            expect(result).deep.equal('Removed correctly!')
        });
    });

   
});