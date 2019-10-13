const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Will not work like find(), somethjing HAS to be passed
// Won't give docs back only the number of docs nuked
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove Match, remove and return removed doc
// Todo.findByIdAndRemove  returns removed doc

// QUERY MORE THAN JUST ID
// Todo.findOneAndRemove({_id: '57c4610dbb35fcbf6fda1154'}).then((todo) => {
//
// });

Todo.findByIdAndRemove('57c4610dbb35fcbf6fda1154').then((todo) => {
  console.log(todo);
});