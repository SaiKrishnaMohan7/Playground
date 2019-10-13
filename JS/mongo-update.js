// old way const MongoClient = require('mongodb').MongoClient;
// ES 6
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/test', (err, /*db in v2*/ client) => {
    if (err) return 'Unable to Connect to db';

    console.log('Connection Successful');
    const db = client.db('TodoApp');
    let filter = {_id: new ObjectID('<id of object>')};
    // mongodb update operators need to be used
    let update = {$set: {text: 'Some update string'}};
    // setting this false returns updated obj
    let returnOriginal = {returnOriginal: false};

    
    // findOneAndUpdate
    db.collection('Todos').findOneAndUpdate(filter, update, returnOriginal).then((result) => {
        console.log(result.result);
    }, (err) => {
        console.log(`Unable to delete todo ${query}`);
    });

    client.close();
});