function solve() {

  class Post {
    constructor(title, content) {
      this.title = title
      this.content = content
    }

    toString() {
      return `Post: ${this.title}\nContent: ${this.content}\n`
    }

  }

  class SocialMediaPost extends Post {
    constructor(title, content, likes, dislike) {
      super(title, content)
      this.likes = Number(likes)
      this.dislikes = Number(dislike)
      this.comments = []
    }

    addComment(comment) {
      this.comments.push(comment)
    }

    toString() {
      let output = super.toString() + `Rating: ${this.likes - this.dislikes}\n`

      if (this.comments.length === 0) {
        return output.trim()
      }

      return output
             + 'Comments:\n'
             + `${this.comments.map(c => ` * ${c}`).join('\n')}`

    }

  }

  class BlogPost extends Post {
    constructor(title, content, views) {
      super(title, content)
      this.views = Number(views)
    }

    view() {
      this.views++

      return this
    }

    toString() {
      return super.toString() + `Views: ${this.views}`
    }
  }

  return {
    Post,
    SocialMediaPost,
    BlogPost
  }

}