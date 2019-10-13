const Post = {
  author(parent, args, { db: { users } }, info) {
      return users.find((user) => {
          return user.id === parent.author
      })
  }
};

export { Post as default };
