const { expect } = require("chai");
const { assert } = require("chai");
const { beforeEach } = require("mocha");

let SkiResort = require('../solution');

describe('Tests', function () {
    let skiResort;

    beforeEach(function () {
        skiResort = new SkiResort("BlackSea");
    });

    describe('Test Constructor', () => {
        it('Test class properties', () => {
            expect(skiResort.name).deep.equal("BlackSea");
            expect(skiResort.voters).deep.equal(0);
            expect(skiResort.hotels).deep.equal([]);
        });
    });

    describe('Test bestHotels()', () => {
        it('If no voters yet, should be 0 and return message', () => {
            expect(skiResort.bestHotel).to.be.equal("No votes yet");
        });

        it('Find best hotel', () => {
            let hotel1 = {
                name: 'SunnyBeach',
                beds: 100,
                points: 2
            };

            let hotel2 = {
                name: 'CloudyBeach',
                beds: 200,
                points: 3
            };

            skiResort.voters = 5;
            skiResort.hotels.push(hotel1);
            skiResort.hotels.push(hotel2);

            expect(skiResort.bestHotel).to.be.equal(`Best hotel is ${hotel2.name} with grade ${hotel2.points}. Available beds: ${hotel2.beds}`)
        });

    });

    describe('Test build()', () => {
        it('It should return error on invalid 1st input param', () => {
            const result = () => skiResort.build("", 1);

            expect(result).to.throw(Error, "Invalid input");
        });

        it('It should return error on invalid 2nd input param', () => {
            const result = () => skiResort.build("Alabala", 0);

            expect(result).to.throw(Error, "Invalid input");
        });
    });

    describe('Test book()', () => {
        it('', () => {


        });
    });

    describe('Test leave()', () => {
        it('', () => {


        });
    });

    describe('Test avrgGrade()', () => {
        it('', () => {


        });
    });
});