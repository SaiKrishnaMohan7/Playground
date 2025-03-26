const User = {
	posts(parent, args, { db: { posts } }, info) {
      return posts.filter((post) => {
          return post.author === parent.id
      })
  },
  comments(parent, args, { db: { comments } }, info) {
    return comments.filter((comment) => {
        return comment.author === parent.id;
    })
	}
};

export { User as default };
