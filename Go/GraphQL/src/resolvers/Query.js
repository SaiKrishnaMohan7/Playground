// Resolvers, fucntions, do the actual work
// Shape of resolver object mimics schema, one method for each query setup
// hello is such a query and hence the resolver

const Query = {
	users(parent, args, { db: { users }}, info) {
      if (!args.query) {
          return users
      }

      return users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
  },

  posts(parent, args, { db: { posts }}, info) {
      if (!args.query) {
          return posts
      }

      return posts.filter((post) => {
          const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
          const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
          return isTitleMatch || isBodyMatch
      })
  },

  comments(parent, args, { db: { comments }}, info) {
    return comments;
  },

  me() {
      return {
          id: '123098',
          name: 'Mike',
          email: 'mike@example.com'
      }
  },

  post() {
      return {
          id: '092',
          title: 'GraphQL 101',
          body: '',
          published: false
      }
  }
};

export { Query as default };
