Feature: orderview Page testing

Scenario: verify an empty order page
  Given login with token session
  When mock response empty order list
  When click on order link
  Then orderlist has 0 orders

Scenario: verify an empty order page
  Given login with token session
  When mock response one item in the order list
  When click on order link
  Then orderlist has 1 orders