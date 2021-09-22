Feature: Shout
  Shouty allows users to "hear" other user's "shouts" as long as they are close enought to each other.

  Todo:
    - only shout to people within a certain distance

  Background:
    Given a person named Lucy
    And a person named Sean

Rule: Shouts can be heard by other users

  Scenario: Listener hears a message
    When Sean shouts "free bagels at Sean's"
    Then Lucy should hear Sean's message

  Scenario: Listener hears a different mesage
    When Sean shouts "Free coffee!"
    Then Lucy should hear Sean's message

Rule: Shouts should only be heard if user is within range

  Scenario: Listener is within range
  Scenario: Listener is out of range