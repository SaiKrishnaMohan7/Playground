// old way const MongoClient = require('mongodb').MongoClient;
// ES 6
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/test', (err, /*db in v2*/ client) => {
    if (err) return 'Unable to Connect to db';

    console.log('Connection Successful');
    const db = client.db('TodoApp');
    
    // Create Collection
    db.collection('Todos').insertOne({
        text: 'Test 2',
        completed: false
    }, (err, result) => {
        if (err) return 'Unable to create Todo';

        console.log(JSON).stringify(result.ops, undefined, 4);
    });
    // Close connection with server
    // db.close(); v2
    client.close();
});

