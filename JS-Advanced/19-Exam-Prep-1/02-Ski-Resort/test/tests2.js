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
            const result = skiResort.bestHotel;
            expect(result).to.be.equal("No votes yet");
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

            let hotel3 = {
                name: 'ShipWreck',
                beds: 200,
                points: 4
            };

            skiResort.voters = 5;
            skiResort.hotels.push(hotel1);
            skiResort.hotels.push(hotel2);
            skiResort.hotels.push(hotel3);

            const result = skiResort.bestHotel;
            expect(result).to.be.equal(`Best hotel is ${hotel3.name} with grade ${hotel3.points}. Available beds: ${hotel3.beds}`)
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

        it('The build should be successful and return success message', () => {
            const result = skiResort.build("Alabala", 3);

            expect(result).to.equal(`Successfully built new hotel - Alabala`);
        });
    });

    describe('Test book()', () => {
        it('It should return error on invalid 1st input param', () => {
            const result = () => skiResort.book("", 1);
            expect(result).to.throw(Error, "Invalid input");
        });

        it('It should return error on invalid 2nd input param', () => {
            const result = () => skiResort.book("Alabala", 0);
            expect(result).to.throw(Error, "Invalid input");
        });

        it('Throw error if hotel does not exists', () => {
            skiResort.hotels.push({
                name: "BlackPearl",
                beds: 10,
                points: 100
            })

            const result = () => skiResort.book("BlackNothing", 2);
            expect(result).to.throw(Error, "There is no such hotel");
        });

        it('Throw error if hotel does have free beds', () => {
            skiResort.hotels.push({
                name: "BlackPearl",
                beds: 2,
                points: 100
            })

            const result = () => skiResort.book("BlackPearl", 3);
            expect(result).to.throw(Error, "There is no free space");
        });

        it('Sustract booked beds from total beds count of a choosen hotel and display correct message', () => {
            let hotel = {
                name: "BlackPearl",
                beds: 2,
                points: 100
            }

            skiResort.hotels.push(hotel)
            const result = skiResort.book("BlackPearl", 1);

            expect(hotel.beds).to.be.deep.equal(1);
            expect(result).to.be.deep.equal("Successfully booked");
        });

    });

    describe('Test leave()', () => {
        it('It should return error on invalid 1st input param', () => {
            const result = () => skiResort.leave("", 1, 10);
            expect(result).to.throw(Error, "Invalid input");
        });

        it('It should return error on invalid 2nd input param', () => {
            const result = () => skiResort.leave("Alabala", 0, 10);
            expect(result).to.throw(Error, "Invalid input");
        });

        it('Throw error if hotel does not exists', () => {
            skiResort.hotels.push({
                name: "BlackPearl",
                beds: 10,
                points: 100
            })

            const result = () => skiResort.leave("BlackNothing", 2, 10);
            expect(result).to.throw(Error, "There is no such hotel");
        });

        it('Method should substract correct values and display correct message', () => {
            let hotel = {
                name: "BlackPearl",
                beds: 10,
                points: 100
            };

            skiResort.hotels.push(hotel)
            skiResort.book("BlackPearl", 2);
            const result = skiResort.leave("BlackPearl", 2, 10);
          
            expect(result).to.be.equal("2 people left BlackPearl hotel")
            expect(hotel.points).to.be.deep.equal(120);
            expect(hotel.beds).to.be.deep.equal(10);
            expect(skiResort.voters).to.be.deep.equal(2);
        });
    });

    describe('Test avrgGrade()', () => {
        it('If voters are 0 a message should be thrown', () => {
            expect(skiResort.averageGrade()).to.be.equal("No votes yet");
        });

        it('Avrg grade should be correct and message should be displayed', () => {
            let hotel1 = {
                name: "BlackSea",
                beds: 10,
                points: 10
            };

            let hotel2 = {
                name: "BlackPearl",
                beds: 10,
                points: 10
            };

            let hotel3 = {
                name: "BlackShip",
                beds: 10,
                points: 10
            };

            skiResort.voters = 3;
            skiResort.hotels.push(hotel1);
            skiResort.hotels.push(hotel2);
            skiResort.hotels.push(hotel3);

            const result = skiResort.averageGrade();
            expect(result).to.be.deep.equal("Average grade: 10.00");
        });
    });
});