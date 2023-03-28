Feature: I can add the product in the dashboard and see the product in the cart.

@Cart
Scenario Outline: I want check the product is added and shown in the shopping cart
  Given I log in with my token session
  When I add product "<productName>" to the cart 
  When I navigate to the cart
  Then I see this product "<productName>" in the cart

  Examples:
      |productName| 
      |zara coat 3|
      |adidas original|