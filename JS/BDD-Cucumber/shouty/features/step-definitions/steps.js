const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { assertThat, is } = require('hamjest');

const {Person, Network} = require('../../src/shouty');


Before(function () {
  this.network = new Network();
  this.people = {};
});

// located/standing, metre(s) - Cucumber expressions, helps with flexibilty of steps
// Custom parameter types
Given('{person} is located/standing {int} metre(s) from Sean', function (person, distance) {
  // Given('Lucy is located {float} metres from Sean', function (float) {
  // Write code here that turns the phrase above into concrete actions

  console.log(person);
  console.log(distance);
  this.network = new Network();
  this.lucy = new Person(this.network);
  this.sean = new Person(this.network);

  this.lucy.moveTo(distance);
});

Given('a person named {person}', function (person) {
  this.people[`${person}`] = new Person(this.network);
  // return 'pending';
});

When('Sean shouts {string}', function (message) {
  this.people['Sean'].shout(message);
  this.messageFromSean = message;
});

Then('Lucy hears Sean\'s message', function () {
  assertThat(this.lucy.messagesHeard(), is([this.messageFromSean]));

  // return 'pending';
});