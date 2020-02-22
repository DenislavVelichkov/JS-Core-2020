const { expect } = require("chai");
const { beforeEach } = require("mocha");

const ChristmasMovies = require('../ChristmasMovie');

describe('Test Christmas Movie functionality', function () {
  let movie;
  let movieName;
  let actors;

  beforeEach(function () {
    movie = new ChristmasMovies();
    movieName = 'Home Alone';
    actors = ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'];
  });

  describe("test constructor()", function () {

    it("Should add movie to collection", function () {
      expect(movie.movieCollection).deep.equal([]);
      expect(movie.watched).deep.equal({});
      expect(movie.actors).deep.equal([]);
    });

  });

  describe("test buyMovie()", function () {

    it("Should add movie to collection", function () {
      let result = movie.buyMovie(movieName, actors);

      expect(result).deep.equal(`You just got Home Alone to your collection in which Macaulay Culkin, Joe Pesci, Daniel Stern are taking part!`)
    });

    it("Should throw error", function () {
      movie.buyMovie(movieName, actors);
      let result = () => movie.buyMovie(movieName, actors);

      expect(result).to.throw('You already own Home Alone in your collection!')
    });

  });

  describe("test discardMovie()", function () {

    it("Should throw error", function () {
      let result = () => movie.discardMovie(movieName);

      expect(result).to.throw(Error, `${movieName} is not at your collection!`)
    });

    it("It should throw error if movie is not watched", function () {
      movie.buyMovie(movieName, actors);

      let result = () => movie.discardMovie(movieName);
      expect(result).to.throw(Error, `${movieName} is not watched!`);
    });

    it("Throw away a movie", function () {
      movie.buyMovie(movieName, actors);
      movie.watchMovie(movieName);

      let result = movie.discardMovie(movieName);
      expect(result).deep.equal(`You just threw away ${movieName}!`);
    });

  });

  describe("test watchMovie()", function () {

    it("Should throw error if movie is not in collection", function () {
      let result = () => movie.watchMovie(movieName);

      expect(result).to.throw(Error, 'No such movie in your collection!')
    });

    it("Watch a movie", function () {
      movie.buyMovie(movieName);
      movie.watchMovie(movieName);

      expect(movie.watched).deep.equal({ 'Home Alone': 1 });
    });

  });

  describe("test favouriteMovie()", function () {
    it("Should throw error if no movie has been watched", function () {
      let result = () => movie.favouriteMovie();

      expect(result).to.throw(Error, 'You have not watched a movie yet this year!');
    });

    it("Pick a fav movie", function () {
      movie.buyMovie(movieName);
      movie.buyMovie('Demolition Guy', ['Silvester Saloun']);
      movie.watchMovie(movieName);
      movie.watchMovie('Demolition Guy');
      movie.watchMovie(movieName);

      let result = movie.favouriteMovie();

      expect(result).deep.equal(`Your favourite movie is ${movieName} and you have watched it 2 times!`)
    });

  });

  describe("test mostStarredActor()", function () {

    it("Should throw error if no movie is watched", function () {
      actors = ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern', 'Silvester Saloun'];

      let result = () => movie.mostStarredActor();

      expect(result).to.throw(Error, 'You have not watched a movie yet this year!');
    });

    it("Should return most stared actor", function () {
      actors = ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern', 'Silvester Staloun'];
      movie.buyMovie(movieName, actors);
      movie.buyMovie('Demolition Guy', ['Silvester Staloun']);

      let result = movie.mostStarredActor();

      expect(result).deep.equal(`The most starred actor is Silvester Staloun and starred in 2 movies!`);
    });

  });
});