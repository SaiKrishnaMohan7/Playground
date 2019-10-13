const Comment = {
  author(parent, args, { db: { users } }, info) {
    return users.find(user => user.id === parent.author);
  }
};

export { Comment as default };
