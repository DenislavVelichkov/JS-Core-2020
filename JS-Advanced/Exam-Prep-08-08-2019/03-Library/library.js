class Library {
    constructor(libraryName) {
        this.libraryName = libraryName;
        this.subscribers = [];
        this.subscriptionTypes = {
            normal: libraryName.length,
            special: libraryName.length * 2,
            vip: Number.MAX_SAFE_INTEGER
        }
    }

    subscribe(name, type) {
        // if (!Object.keys(this.subscriptionTypes).includes(type)) {
        //     throw new Error(`The type ${type} is invalid`)
        // }

        if (!this.subscriptionTypes[type]) {
            throw new Error(`The type ${type} is invalid`)
        }

        let subscribedPerson = this.findSubscriber(name);

        if (!subscribedPerson) {
            subscribedPerson = { name, type, books: [] };
            this.subscribers.push(subscribedPerson);
        } else {
            subscribedPerson.type = type;
        }

        return subscribedPerson;
    }

    unsubscribe(name) {
        let subscribedPerson = this.findSubscriber(name);

        if (!subscribedPerson) {
            throw new Error(`There is no such subscriber as ${name}`)
        }

        this.subscribers = this.subscribers.filter(s => s.name !== subscribedPerson.name);

        return this.subscribers;
    }

    receiveBook(subscriberName, bookTitle, bookAuthor) {
        let subscribedPerson = this.findSubscriber(subscriberName);

        if (!subscribedPerson) {
            throw new Error(`There is no such subscriber as ${subscriberName}`);
        }

        let currentSubscribtionLimit = this.subscriptionTypes[subscribedPerson.type];

        if (currentSubscribtionLimit < subscribedPerson.books.length + 1) {
            throw new Error(`You have reached your subscription limit ${currentSubscribtionLimit}!`);
        }

        let newBook = { title: bookTitle, author: bookAuthor };
        subscribedPerson.books.push(newBook);

        return subscribedPerson;
    }

    findSubscriber(name) {
        return this.subscribers.find(s => s.name === name);
    }

    showInfo() {
        let result = "";

        if (this.subscribers.length === 0) {
            result += `${this.libraryName} has no information about any subscribers`;

            return result;
        }

        // Array.from(this.subscribers).forEach(s => {
        //     result += `Subscriber: ${s.name}, Type: ${s.type}\nReceived books: `;

        //     Array.from(s.books).forEach(b => {
        //         result += `${b.title} by ${b.author}, `;
        //     });
            
        //     result = result.slice(0, result.length - 2) + "\n";
        // });

        // return result;

        return this.subscribers
            .map(s =>
                `Subscriber: ${s.name}, Type: ${s.type}\nReceived books: ${s.books
                    .map(b =>
                        `${b.title} by ${b.author}`)
                    .join(", ")}`)
            .join("\n");;
    }
}

let lib = new Library('Lib');

lib.subscribe('Peter', 'normal');
lib.subscribe('John', 'special');
lib.subscribe('Josh', 'vip');

lib.receiveBook('John', 'A Song of Ice and Fire', 'George R. R. Martin');
lib.receiveBook('Peter', 'Lord of the rings', 'J. R. R. Tolkien');
lib.receiveBook('John', 'Harry Potter', 'J. K. Rowling');
lib.receiveBook('Josh', 'Graf Monte Cristo', 'Alexandre Dumas');
lib.receiveBook('Josh', 'Cromwell', 'Victor Hugo');
lib.receiveBook('Josh', 'Marie Tudor', 'Victor Hugo');
lib.receiveBook('Josh', 'Bug-Jargal', 'Victor Hugo');
lib.receiveBook('Josh', 'Les Orientales', 'Victor Hugo');
lib.receiveBook('Josh', 'Marion de Lorme', 'Victor Hugo');

console.log(lib.showInfo());

