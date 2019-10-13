const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/test', (err, /*db in v2*/ client) => {
    if (err) return 'Unable to Connect to db';

    console.log('Connection Successful');
    const db = client.db('TodoApp');
    var query = {completed: true};
    // _id property of mongo is an object and not a string, hence querying needs to be done as below
    // query = new ObjectID('<id of the Object you are lookig for>')
    
    // find returns a cursor, toArray is a cursor method
    // in db-connect the callback was used, if there's no callback then the method returns a promise
    // so we use then.
    db.collection('Todos').find(query).toArray.then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch Todos');
    });
    client.close();
});