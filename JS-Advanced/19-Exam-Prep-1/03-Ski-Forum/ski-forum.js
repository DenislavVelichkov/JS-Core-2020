class Forum {
  constructor() {
    this._users = [];
    this._questions = [];
    this._id = 1;
  }
  
  register(username, password, repeatPassword, email) {

    if (!(username && password && repeatPassword && email)) {
      throw new Error("Input can not be empty");
    }

    if (password !== repeatPassword) {
      throw new Error("Passwords do not match");
    }

    if (this._users.find(u => u.username === username) 
        || this._users.find(u => u.email === email)) {
      throw new Error("This user already exists!");
    }

    this._users.push({ username: username, password: password, email: email, isUserLoggedIn: false });

    return `${username} with ${email} was registered successfully!`
  }

  login(username, password) {
    let user = this._users.find(u => u.username === username);

    if (!user) {
      throw new Error("There is no such user");
    }

    if (user.password === password && user.isUserLoggedIn === false) {
      user.isUserLoggedIn = true;

      return "Hello! You have logged in successfully";
    }

  }

  logout(username, password) {
    let user = this._users.find(x => x.username === username);

    if (!user) {
      throw new Error("There is no such user");
    }


    if (user.password === password && user.isUserLoggedIn === true) {
      user.isUserLoggedIn = false;

      return "You have logged out successfully";
    }
  }

  postQuestion(username, question) {
    let user = this._users.find(u => u.username === username);

    if (!user || user.isUserLoggedIn === false) {
      throw new Error("You should be logged in to post questions");
    }

    if (!question) {
      throw new Error("Invalid question");
    }

    this._questions.push({ id: this._id++, username: username, question: question, answers: [] });

    return "Your question has been posted successfully";

  }

  postAnswer(username, questionId, answer) {
    let question = this._questions.find(q => q.id === questionId);
    let user = this._users.find(u => u.username === username);

    if (!user || user.isUserLoggedIn === false) {
      throw new Error("You should be logged in to post answers")
    }

    if (!answer) {
      throw new Error("Invalid answer")
    }

    if (!question) {
      throw new Error("There is no such question")
    }

    question.answers.push({ username: username, answer: answer });

    return "Your answer has been posted successfully";
  }

  showQuestions() {
    // let result = "";

    // this.questions.forEach(q => {
    //   result += `Question ${q.id} by ${q.username}: ${q.question}\n`
    //   q.answers.forEach(a => {
    //     result += `---${a.username}: ${a.answer}\n`
    //   });
    // });

    let result = Array.from(this._questions)
      .map(q => `Question ${q.id} by ${q.username}: ${q.question}\n`
        + `${q.answers.map(a => `---${a.username}: ${a.answer}`).join("\n")}`).join("\n");

    return result.trim();
  }

}

let forum = new Forum();

forum.register('Jonny', '12345', '12345', 'jonny@abv.bg');
forum.register('Peter', '123ab7', '123ab7', 'peter@gmail@.com');
forum.login('Jonny', '12345');
forum.login('Peter', '123ab7');

forum.postQuestion('Jonny', "Do I need glasses for skiing?");
forum.postAnswer('Peter', 1, "Yes, I have rented one last year.");
forum.postAnswer('Jonny', 1, "What was your budget");
forum.postAnswer('Peter', 1, "$50");
forum.postAnswer('Jonny', 1, "Thank you :)");

console.log(forum.showQuestions());


