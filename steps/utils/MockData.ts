
export interface LoginPayload {
    userEmail: string;
    userPassword: string;
}

export interface CartPayload {
    products: products [];
    count: number;
    message: string
}

export interface OrderPayload {
    data: products [];
    count?: number;
    message: string
}

export interface products {
    _id: string;
    productName: string;
    productCategory: string;
          productSubCategory: string;
          productPrice: number;
          productDescription: string;
          productImage: string;
          productRating: string;
          productTotalOrders: string;
          productStatus: boolean;
          productFor: string;
          productAddedBy: string;
          __v: number;
}

export const loginPayLoad = {userEmail:"anshika@gmail.com", userPassword:"Iamking@000"};
export const cartPayload = { products:[
            {
              _id: "6262e95ae26b7e1a10e89bf0",
              productName: "zara coat 3",
              productCategory: "fashion",
              productSubCategory: "shirts",
              productPrice: 31500,
              productDescription: "zara coat 3",
              productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg",
              productRating: "0",
              productTotalOrders: "0",
              productStatus: true,
              productFor: "women",
              productAddedBy: "admin@gmail.com",
              __v: 0
            }
          ],
          count: 1,
          message: "Cart Data Found"};

export const orderPayload = {
    data:[{
            _id: "6262e95ae26b7e1a10e89bf0",
            productName: "zara coat 3",
            productCategory: "fashion",
            productSubCategory: "shirts",
            productPrice: 31500,
            productDescription: "zara coat 3",
            productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg",
            productRating: "0",
            productTotalOrders: "0",
            productStatus: true,
            productFor: "women",
            productAddedBy: "admin@gmail.com",
            __v: 0
          }
        
            ], count: 10,
            message: "All Products fetched Successfully"};

export const emptyOrderPayLoad = {data:[], message:"No Orders"};       