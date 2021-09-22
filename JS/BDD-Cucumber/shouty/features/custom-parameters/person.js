const { defineParameterType } = require('@cucumber/cucumber');
const Person = require('../../src/shouty');

defineParameterType({
  name: 'person', // name of the custom parameter to be used in the expression
  regexp: /Lucy|Sean/, // What text to match when seraching for the custom parameter in the Gherkin step
  transformer: name => new Person(name) // Whatever is matched with the RegEx above will be passed to this fn the return value of which will be passed to step definition
})