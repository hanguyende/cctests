Feature: login Page testing

Scenario: Login is successfull
  Given login with user 'anshika@gmail.com' and pwd 'Iamking@000'
  When Submit login
  Then I am 'true' able to Login


Scenario: Login is not successfull
  Given login with user 'anshika@gmail.com' and pwd 'Iamking@00'
  When Submit login
  Then I am 'false' able to Login