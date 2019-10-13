// old way const MongoClient = require('mongodb').MongoClient;
// ES 6
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/test', (err, /*db in v2*/ client) => {
    if (err) return 'Unable to Connect to db';

    console.log('Connection Successful');
    const db = client.db('TodoApp');
    let query = {text: 'TestDelete'};
    
    // deleteMany, deleteOne, findOneAndDelete
    db.colloection('Todos').deleteMany(query).then((result) => {
        console.log(result.result);
    }, (err) => {
        console.log(`Unable to delete todo ${query}`);
    });

    db.colloection('Todos').deleteOne(query).then((result) => {
        console.log(result.result);
    }, (err) => {
        console.log(`Unable to delete todo ${query}`);
    });

    db.colloection('Todos').findOneAndDelete(query).then((result) => {
        // Will give exact item that got deleted
        console.log(result.value);
    }, (err) => {
        console.log(`Unable to delete todo ${query}`);
    });

    client.close();
});