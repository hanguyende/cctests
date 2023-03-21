Feature: login Page testing

Scenario: Login successfull
  Given login with user 'anshika@gmail.com' and pwd 'Iamking@000'
  When Submit login
  Then I am able to Login