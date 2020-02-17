class Forum {
  constructor() {
    this.users = [];
    this.questions = [];
    this.id = 1;
    this.loggedInUsers = [];
  };

  register(username, password, repeatPassword, email) {

    if (!(username && password && repeatPassword && email)) {
      throw new Error("Input can not be empty");
    }

    if (password !== repeatPassword) {
      throw new Error("Passwords do not match");
    }

    if (this.users.find(u => u.username === username || u.email === email)) {
      throw new Error("This user already exists!");
    }

    this.users.push({
      username: username,
      password: password,
      email: email
    });

    return `${username} with ${email} was registered successfully!`
  }

  login(username, password) {

    if (!this.users.find(u => u.username === username)) {
      throw new Error("There is no such user");
    }

    let userToLogin = this.users.find(u => u.username === username && u.password === password);

    if (userToLogin) {
      this.loggedInUsers.push(userToLogin);

      return "Hello! You have logged in successfully";
    }

  }

  logout(username, password) {

    if (!this.users.find(x => x.username === username)) {
      throw new Error("There is no such user");
    }

    let user = this.users.find(x => x.username === username && x.password === password);

    if (user) {
      this.loggedInUsers = this.loggedInUsers.reduce((acc, current) => {
        if (current.username !== user.username) {
          acc.push(current)
        }

        return acc;
      }, []);

      return "You have logged out successfully!";
    }
  }

  postQuestion(username, question) {

    if (!this.loggedInUsers.find(u => u.username === username)) {
      throw new Error("You should be logged in to post questions");

    } else if (!question) {

      throw new Error("Invalid question");
    } else {
      this.questions.push({
        id: this.id++,
        username: username,
        question: question,
        answers: [],
      });

      return "Your question has been posted successfully";
    }
  }

  postAnswer(username, questionId, answer) {
    const question = this.questions.find(q => q.id === questionId);
    const isUserLoggedIn = this.loggedInUsers.find(u => u.username === username);
    const doesUserExist = this.users.find(u => u.username === username);

    if (!(isUserLoggedIn && doesUserExist)) {
      throw new Error("You should be logged in to post answers")
    }

    if (!answer) {
      throw new Error("Invalid answer")
    }

    if (!question) {
      throw new Error("There is no such question")
    }

    question.answers.push({
      username: username,
      answer: answer
    })

    return "Your answer has been posted successfully";
  }

  showQuestions() {
    let result = "";
    this.questions.forEach(q => {
      result += `Question ${q.id} by ${q.username}: ${q.question}\n`
      q.answers.forEach(a => {
        result += `---${a.username}: ${a.answer}\n`
      });
    });

    return result.trim();
  }
}

let forum = new Forum();

forum.register('Michael', '123', '123', 'michael@abv.bg');
forum.register('Stoyan', '123ab7', '123ab7', 'some@michael@.com');
forum.login('Michael', '123');
forum.login('Stoyan', '123ab7');

forum.postQuestion('Michael', "Alabala");
// forum.postAnswer('Stoyan', 1, "Yes, I have rented one last year.");
forum.postQuestion('Stoyan', "How long are supposed to be the ski for my daughter?");
forum.postAnswer('Michael', 2, "How old is she?");
forum.postAnswer('Michael', 2, "Tell us how tall she is.");

console.log(forum.showQuestions());
