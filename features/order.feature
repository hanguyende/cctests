Feature: After choosing my product, I can go to the checkout, Update Persional information,
        Select shipping information and complete the purchase

        @Orders
        Scenario: Add a product to the cart, go to checkout and use default persional information,
                select shipping information and place the order
                Given I am login with my token session
                When I add product "zara coat 3" to the cart
                When I navigate to the cart
                Then I see this product "zara coat 3" in the cart
                When After choosing my product, I can go to the checkout
                Then I select shipping information countryCode 'ind' and countryName 'India'
                Then I complete the purchase

         @Orders
        Scenario Outline: verify count of orders page
                Given I am login with my token session
                When I mock product list response of api call with "<ordersCount>"
                When I navigate to the Orders
                Then I verify my orderlist has "<ordersCount>" orders

                Examples:
                        | ordersCount |
                        | 0           |
                        | 1           |