function solve () {
  class Post {
    constructor (title, content) {
      this.postTitle = title
      this.postContent = content
    }

    toString () {
      return `Post: ${this.postTitle}\nContent: ${this.postContent}`
    }
  }

  class SocialMediaPost extends Post {
    constructor (title, content, likes, dislike) {
      super(title, content)
      this.likes = Number(likes)
      this.dislikes = Number(dislike)
      this.comments = []
    }

    addComment(comment) {
      this.comments.push(comment)
    }

    toString() {
      let output = `Post: ${this.postTitle}\n`
      + `Content: ${this.postContent}\n`
      + `Rating: ${this.likes - this.dislikes}\n`

      if (!this.comments) {
        return output
      }

      return output
           + `Comments:\n`
           + `${this.comments.map(c => ` * ${c}`).join("\n")}`
    }

  }
      class BlogPost extends Post {}


  // let post = new Post('Alabala', 'Alabala')
  // let mediaPost = new SocialMediaPost('dasdsadsa', 'adsaddsa', 10, 5)
  // mediaPost.comments.push('Alaalalal')
  // mediaPost.comments.push('Blaalalal')
  // mediaPost.comments.push('Claalalal')
  // let mediaPost2 = new SocialMediaPost('dasdsadsa', 'adsaddsa', 4, 5)
  // console.log(post.toString())
  // console.log(mediaPost.toString())
}

// solve()
