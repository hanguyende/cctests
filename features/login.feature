Feature:  On the login page I can only login with a valid username and password

@Login
Scenario Outline: I login with user and password and verify the result.
  Given I log in with user "<User>" and password "<Password>"
  When I submit login
  Then I am "<LoginSuccess>" able to Login

  Examples:
      |User|Password|LoginSuccess|
      |anshika@gmail.com|Iamking@00|false|
      |anshika@gmail.com|Iamking@000|true|