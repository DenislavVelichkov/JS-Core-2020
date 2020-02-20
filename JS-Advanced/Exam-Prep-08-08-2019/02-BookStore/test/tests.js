const { expect } = require("chai");
const { beforeEach } = require("mocha");

let BookStore = require('../BookStore');
// The tests a written by keeping in mind that we have 1 hour to think on the exam. They do not follow best practices.

describe("Bookstore Tests", function () {
    let bookStore;
    let books;
    let worker;

    beforeEach(function () {
        bookStore = new BookStore("Chitanka");
        books = ["Shestoto Kleimo-Dan Braun",
            "Java Design Patterns-Torvald's cousin",
            "JS For Dummies-Not Me",
            "Stani Beden-Niki Kynchev"];
        worker = {
            name: "Charlie",
            position: "seller",
            booksSold: 0
        };

        worker1 = {
            name: "Vevo",
            position: "seller",
            booksSold: 0
        };

        worker2 = {
            name: "Velma",
            position: "seller",
            booksSold: 0
        };
    });

    describe("test constructor()", function () {
        it("Should instantiate correctly", function () {
            expect(bookStore.name).deep.equal("Chitanka");
            expect(bookStore.books).deep.equal([]);
            expect(bookStore.workers).deep.equal([]);
        });
    });

    describe("test stockBooks()", function () {
        it("Adding books to books array", function () {
            let result = bookStore.stockBooks(books);

            expect(result.length).deep.equal(4);
            expect(result).deep.equal([
                {
                    author: "Dan Braun",
                    title: "Shestoto Kleimo",
                },
                {
                    author: "Torvald's cousin",
                    title: "Java Design Patterns"
                },
                {
                    author: "Not Me",
                    title: "JS For Dummies"
                },
                {
                    author: "Niki Kynchev",
                    title: "Stani Beden"
                }]);
        });
    });

    describe("test hire()", function () {
        it("Hire worker should throw Error", function () {
            bookStore.hire(worker.name, worker.position);
            let falseWorker = () => bookStore.hire("Charlie", "seller");

            expect(falseWorker).to.throw(Error, "This person is our employee");
        });

        it("Hire worker should work correctly", function () {
            let newWorker = bookStore.hire("June", "seller");

            expect(newWorker).deep.equal("June started work at Chitanka as seller");
            expect(bookStore.workers[0]).deep.equal({
                name: "June",
                position: "seller",
                booksSold: 0
            });
        });


    });

    describe("test fire()", function () {
        it("Should throw error", function () {

            let falseWorker = () => bookStore.fire("June");

            expect(falseWorker).to.throw(Error, "June doesn't work here")
        });

        it("Should fire worker", function () {
            bookStore.hire(worker.name, worker.position);

            let workerToBeFired = bookStore.fire(worker.name);

            expect(workerToBeFired).to.deep.equal(`${worker.name} is fired`)
            expect(bookStore._workers.length).to.deep.equal(0)
        });
    });

    describe("test sellBook()", function () {
        it("Sell a book should throw errors", function () {
            bookStore.hire(worker.name, worker.position);
            bookStore.stockBooks(books);

            let nonExistentBook = () => bookStore.sellBook("Cherno", worker.name);
            let nonExistentWorker = () => bookStore.sellBook("Stani Beden", "June");

            expect(nonExistentBook).to.throw(Error, "This book is out of stock")
            expect(nonExistentWorker).to.throw(Error, "June is not working here")

        });

        it("Sell a book should work correctly", function () {
            bookStore.hire(worker.name, worker.position);
            bookStore.hire(worker1.name, worker1.position);
            bookStore.hire(worker2.name, worker2.position);

            bookStore.stockBooks(books);
            bookStore.sellBook("Stani Beden", worker.name)
            bookStore.sellBook("Java Design Patterns", worker1.name)
            bookStore.sellBook("JS For Dummies", worker2.name)

            expect(bookStore.books.length).to.deep.equal(1)
            expect(bookStore.workers[0].booksSold).to.deep.equal(1)
            expect(bookStore.workers[1].booksSold).to.deep.equal(1)
            expect(bookStore.workers[2].booksSold).to.deep.equal(1)
        });

    });

    describe("test printWorkers()", function () {
        it("Should Print workers correctly", function () {
            bookStore.hire(worker.name, worker.position)
            bookStore.hire(worker1.name, worker1.position);
            bookStore.hire(worker2.name, worker2.position);

            let result = bookStore.printWorkers();

            expect(result).to.deep.equal(
                `Name:${worker.name} Position:${worker.position} BooksSold:${worker.booksSold}\n`
                + `Name:${worker1.name} Position:${worker1.position} BooksSold:${worker1.booksSold}\n`
                + `Name:${worker2.name} Position:${worker2.position} BooksSold:${worker2.booksSold}`)
        });
    });

});
