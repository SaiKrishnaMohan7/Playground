# BDD with Cucumber

Testing system behaviour as oppossed to implementation
Domain modelling -> Write some code -> Make it compile -> Run the scenario & watch it fail
Scenarios no longer than 5 steps long, too many `When`'s  means we are testing more than one business rule

![BDD Mental Model](./BDDMentalModel.png)

## Keywords and meanings - Gherkin

- `Scenario` - test description, test case, describe; Should reveal intention
- `Given`
  - *describes something that has already happened before the interesting part of the scenario starts*
  - *describes the context in which the scenario occurs*
  - Context for the test, what all things are available to us when we are testing the Scenario? **SETTING SYSTEM STATE**
- `When`
  - *Expresses an action that changes the state of the system*
  - Action, some change that'd trigger some cascading chnage within the system
- `Then`
  - *explains what should happen at the end of the scenario*
  - Outcome, **STATE TRANSITION**, system behavior, what will the system do `When` action happens
- `Before`
  - A hook to do a common setup for tests, runs before every scenario... Just like `Jest.Before()`; Applies at step def level
- `Background`
  - Common setup for tests in Gherkinn not in step defs

- Custom Parameters - help with bringing the application Domain Model closer the the Domain Language in which the tests are written'
  - Cucumber let's you define your own DSL for the tests that can in turn serve as docs!

- Step defs should be short
  - Because the plain-language description of the domain in the Gherkin step should be close to the domain model in the code

## Tricks (These can be done via the `cucumber.js` config file as well)

- `npm test -- --name <RegexMatchingScenario(s) OR NameOfScenario>`
- `npm test -- features/<nameOfFeatureFile>:<linesAtWhichScenriosAreDefinedSeparatedByColon>` - npm run test -- features/hear_shout.feature:44:33:56 (will run three scenarios that occur at those line numbers)
- Using tags

    ```gherkin
      @focus # This is a TAG! Case sensitive; User defined! Temporary maybe removed
      Scenario: Listener is within range
      Given Lucy is located 15 metres from Sean
      When Sean shouts "free bagels at Sean's"
      Then Lucy hears Sean's message
    ```

    ```javascript
      module.exports = { default: '--publish-quiet --tags @focus' };

      module.exports = { default: '--publish-quiet --tags "not @focus"' }; // Will run scenarios that are not tagged as focus!
    ```

    ```sh
    npm run test -- --tags @focus
    ```

  - Tags can also be combined with hooks (Cucumber docs FTW)
  - `npm test -- --i18n-languages` - Get the list of suported languages to write Gherkin in
    - `npm test -- --i18n-keywords <languageCode>` - npm test -- --i18n-keywords ta to see what the Gherkin keyword for the language in Tamizh
  - To tell cucumber what language the feature file is wtitten in `# language: ta` at the top of the feature file

    ```javascript
      module.exports = { default: '--publish-quiet --order random' }; // to run tests in random order
    ```

    ```sh
    npm run test -- --order random
    ```

  - Test output can be formatted to HTML, JSON and even to a txt file `@<fileNameOfChoice>.txt` (this one in particular can be used to figure out which test is failing; Called the `rerun` formatter)

## Source

- [Cucumber School](https://school.cucumber.io/courses/take/bdd-with-cucumber-javascript)
