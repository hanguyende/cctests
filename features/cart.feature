Feature: cart Page testing

Scenario: verify product is add and displaying in cart
  Given login with user 'anshika@gmail.com' and pwd 'Iamking@000' to dashboard
  When add productname to cart 'zara coat 3' 
  Then productname 'zara coat 3' is 'true' in the cart

Scenario: verify product is add and remove from cart
  Given login with user 'anshika@gmail.com' and pwd 'Iamking@000' to dashboard
  When remove productname to cart 'zara coat 3' 
  Then productname 'zara coat 3' is 'false' in the cart