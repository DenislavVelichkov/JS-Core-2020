class Article {
  constructor(title, creator) {
    this.title = title
    this.creator = creator
    this._comments = [];
    this._likes = [];
    this.commentId = 1;
    this.replyId = 1;
  }

  get likes() {
    if (this._likes.length === 0) {
      return `${this.title} has 0 likes`
    }

    if (this._likes.length === 1) {
      return `${this._likes[0]} likes this article!`
    }

    return `${this._likes[0]} and ${this._likes.length - 1} others like this article!`
  }

  like(username) {
    if (this._likes.includes(username)) {
      throw new Error("You can't like the same article twice!")
    }

    if (this.creator === username) {
      throw new Error("You can't like your own articles!")
    }

    this._likes.push(username)

    return `${username} liked ${this.title}!`
  }

  dislike(username) {
    if (!this._likes.includes(username)) {
      throw new Error("You can't dislike this article!")
    }
    this._likes = this._likes.filter(u => u !== username)

    return `${username} disliked ${this.title}`
  }

  comment(username, content, id) {
    let isCommentPresent = this._comments.find(c => c.Id === id)

    if (!id || !isCommentPresent) {

      const comment = {
        Id: this.commentId++,
        Username: username,
        Content: content,
        Replies: [],
      }

      this._comments.push(comment)

      return `${username} commented on ${this.title}`
    }

    if (isCommentPresent) {
      isCommentPresent.Replies.push({
        Id: Number(String(id) + "." + String(this.replyId++)),
        Username: username,
        Content: content
      })

      return "You replied successfully";
    }
  }

  toString(sortingType) {
    let output =
      `Title: ${this.title}\n`
      + `Creator: ${this.creator}\n`
      + `Likes: ${this._likes.length}\n`
      + `Comments:\n`


    switch (sortingType) {

      case "asc":
      this._comments.sort((a, b) => {
        return a.Id - b.Id;
      }).forEach(c => {
        c.Replies.sort((a, b) => a.Id - b.Id)
        
      })

        break;
      case "desc":
        this._comments.sort((a, b) => {
          return b.Id - a.Id;
        }).forEach(c => {
          c.Replies.sort((a, b) => b.Id - a.Id)

        })

        break;
      case "username":
        this._comments.sort((a, b) => a.Username.localeCompare(b.Username))
        .forEach(c => {
          c.Replies.sort((a, b) => a.Username.localeCompare(b.Username))
        })

        break;
    }
    this._comments.map(c => {
      let entry = `-- ${c.Id}. ${c.Username}: ${c.Content}\n${c.Replies.map(r => `--- ${r.Id}. ${r.Username}: ${r.Content}`).join("\n")}`
      return entry;
    }).forEach(c => output += c);
    
    
    return output;
  }
}
let art = new Article("My Article", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));

