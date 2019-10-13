import casual from 'casual';

const Mutation = {
  createUser(parent, { newUser }, { db: { users } }, info) {
    const emailTaken = users.some(user => user.email === newUser.email);
    const nameTaken = users.some(user => user.name === newUser.name);

    if (nameTaken || emailTaken) {
      throw new Error ('Email or user name already taken');
    }
    const user = { id: casual.uuid, ...newUser };
    users.push(user);

    return user;
  },
  createPost(parent, { newPost }, { db: { users, posts } }, info) {
    const userExists = users.some((user) => user.id === newPost.author)

    if (!userExists) {
        throw new Error('User not found')
    }

    const post = {
        id: uuidv4(),
        ...newPost
    };

    posts.push(post);

    return post;
},
createComment(parent, { newComment }, { db: { users, posts, comments } }, info){
    const userExists = users.some((user) => user.id === newComment.author)
    const postExists = posts.some((post) => post.id === newComment.post && post.published)

    if (!userExists || !postExists) {
        throw new Error('Unable to find user and post')
    }

    const comment = {
        id: uuidv4(),
        ...newComment,
    };

    comments.push(comment);

    return comment;
},
// refactor
updateUser(parent, args, { db }, info) {
  const { id, data } = args
  const user = db.users.find((user) => user.id === id)

  if (!user) {
      throw new Error('User not found')
  }

  if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email)

      if (emailTaken) {
          throw new Error('Email taken')
      }

      user.email = data.email
  }

  if (typeof data.name === 'string') {
      user.name = data.name
  }

  if (typeof data.age !== 'undefined') {
      user.age = data.age
  }

  return user
},
// refactor
updatePost(parent, args, { db }, info) {
  const { id, data } = args
  const post = db.posts.find((post) => post.id === id)

  if (!post) {
      throw new Error('Post not found')
  }

  if (typeof data.title === 'string') {
      post.title = data.title
  }

  if (typeof data.body === 'string') {
      post.body = data.body
  }

  if (typeof data.published === 'boolean') {
      post.published = data.published
  }

  return post
},
// refactor
updateComment(parent, args, { db }, info) {
  const { id, data } = args
  const comment = db.comments.find((comment) => comment.id === id)

  if (!comment) {
      throw new Error('Comment not found')
  }

  if (typeof data.text === 'string') {
      comment.text = data.text
  }

  return comment
},

deleteUser(parent, { id }, { db: { users, posts, comments } }, info) {
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
      throw new Error('User not found')
  }

  // Delete user
  const deletedUsers = users.splice(userIndex, 1)

  // Delete all posts by the user
  posts = posts.filter((post) => {
      const match = post.author === id

      if (match) {
          comments = comments.filter((comment) => comment.post !== post.id)
      }

      return !match
  })
  // Delete all comments by user
  comments = comments.filter((comment) => comment.author !== id)

  return deletedUsers[0]
},
deletePost(parent, { id }, { db: { posts, comments } }, info) {
  const postIndex = posts.findIndex(post => post.id === ID);

  if (postIndex === -1) {
    throw new Error('Post not found');
  }

  // Delete Post
  const deletedPost = posts.splice(postIndex, 1);
  // Delete associated comments
  comments = comments.filter(comment => comment.post !== id);

  return deletedPost[0];
},
deleteComment(parent, { id }, { db: { comments } }, info) {
  const commentIndex = comments.findIndex(post => post.id === ID);

  if (commentIndex === -1) {
    throw new Error('Comment not found');
  }

  // Delete Post
  const deletedComment = comments.splice(commentIndex, 1);

  return deletedComment[0];
},
};

export { Mutation as default };