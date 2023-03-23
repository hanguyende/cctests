Feature: cart Page testing

Scenario: verify product adding and displaying in cart
  Given login with token session
  When adding productname to cart 'zara coat 3' 
  Then productname 'zara coat 3' is 'true' in the cart