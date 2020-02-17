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

    if (this.users.find(x => x.username === username || x.email === email)) {
      throw new Error("This user already exists!");
    }

    let user = {
      username: username,
      password: password,
      email: email
    }

    this.users.push(user);

    return `${username} with ${email} was registered successfully!`
  };

  login(username, password) {

    if (this.users.find(x => x.username !== username)) {
      throw new Error("There is no such user");
    }

    let user = this.users.find(x => x.username === username && x.password === password);

    if (user) {
      this.loggedInUsers.push(user);

      return "Hello! You have logged in successfully";
    }

  }

  logout(username, password) {

    if (this.users.find(x => x.username !== username)) {
      throw new Error("There is no such user");
    }

    let user = this.users.find(x => x.username === username && x.password === password);

    if (user) {
      this.loggedInUsers.filter(u => u.username !== user.username);
      console.log(this.loggedInUsers)
      return "You have logged out successfully Hello! You have logged in successfully";
    }

  }

  postQuestion(username, question) {
    let question = {
      id: this.id
    };

    // if () {

    // }

    this.questions.push(question);
  }
}

let forum = new Forum();
console.log(forum.register("Alabala", "Asd123", "Asd123", "aa@aa.aa"));
console.log(forum.login("Alabala", "Asd123"));
console.log(forum.logout("Alabala", "Asd123"));