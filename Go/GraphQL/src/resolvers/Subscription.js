const Subscription = {
  // unlike Mutations and Queries, Subscription object attrs are objects and not fucntions
  //  that object has a method `subscribe` that is run everytime someone subscribes to this
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count ++;
        // propoerty name on the object SHOULD MATCH subscription name
        pubsub.publish('count', { count });
      }, 3000);

      // We do not return what is there in the schema like Queries and Mutation
      return pubsub.asyncIterator('count');
    }
  }
};

export { Subscription as default }
