import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], productsTotal: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const incomingProduct = { ...action.payload };
      const cart = JSON.parse(JSON.stringify(state.cart));
      const selectedAttributesVal = incomingProduct.attributes
        .map((attribute) =>
          attribute.items.map((item) => item.selected && item.value),
        )
        .flat(1)
        .join("")
        .toLowerCase();
      /* calculating 'internalID' - to differentiate products from each other in terms of id or different attributes that they have  */
      const internalID = `${incomingProduct.id}${selectedAttributesVal}`;
      let updatedProduct = { ...incomingProduct };
      updatedProduct.quantity = 1;
      updatedProduct.internalID = internalID;
      let updatedCart = [...cart];
      updatedCart.push(updatedProduct);
      const filteredCart = cart.filter(
        (product) => product.internalID === internalID,
      );
      let updatedProductsTotal = 0;
      let updatedTotalPrice = 0;

      if (filteredCart.length > 0) {
        updatedProduct = { ...filteredCart[0] };
        updatedProduct.quantity += 1;

        const cartWithOutUpdatedProduct = cart.filter(
          (product) => product.internalID !== internalID,
        );
        cartWithOutUpdatedProduct.push(updatedProduct);
        updatedCart = cartWithOutUpdatedProduct;
      }
      updatedProductsTotal = Object.keys(updatedCart).reduce(
        (acc, index) => acc + updatedCart[index].quantity,
        0,
      );

      updatedTotalPrice = Object.keys(updatedCart)
        .reduce(
          (acc, index) =>
            acc +
            updatedCart[index].quantity * updatedCart[index].prices[0].amount,
          0,
        )
        .toFixed(2);

      return {
        ...state,
        cart: updatedCart,
        productsTotal: updatedProductsTotal,
        totalPrice: updatedTotalPrice,
      };
    },
    increaseQuantity(state, action) {
      const cart = JSON.parse(JSON.stringify(state.cart));
      let updatedProductsTotal = 0;
      let updatedTotalPrice = 0;
      const updatedCart = cart.map((product) => {
        let updatedQuantity = product.quantity;
        if (product.internalID === action.payload) {
          updatedQuantity += 1;
        }
        return { ...product, quantity: updatedQuantity };
      });

      updatedProductsTotal = Object.keys(updatedCart).reduce(
        (acc, index) => acc + updatedCart[index].quantity,
        0,
      );

      updatedTotalPrice = Object.keys(updatedCart)
        .reduce(
          (acc, index) =>
            acc +
            updatedCart[index].quantity * updatedCart[index].prices[0].amount,
          0,
        )
        .toFixed(2);

      return {
        ...state,
        cart: updatedCart,
        productsTotal: updatedProductsTotal,
        totalPrice: updatedTotalPrice,
      };
    },
    decreaseQuantity(state, action) {
      const cart = JSON.parse(JSON.stringify(state.cart));
      let updatedProductsTotal = 0;
      let updatedTotalPrice = 0;
      let updatedQuantity = 0;
      let updatedProductIndex = 0;
      const updatedCart = cart.map((product, index) => {
        updatedQuantity = product.quantity;
        if (product.internalID === action.payload) {
          updatedQuantity -= 1;
        }

        if (updatedQuantity === 0) {
          updatedProductIndex = index;
        }

        return { ...product, quantity: updatedQuantity };
      });

      if (updatedQuantity === 0) {
        updatedCart.splice(updatedProductIndex, 1);
      }

      updatedProductsTotal = Object.keys(updatedCart).reduce(
        (acc, index) => acc + updatedCart[index].quantity,
        0,
      );

      updatedTotalPrice = Object.keys(updatedCart)
        .reduce(
          (acc, index) =>
            acc +
            updatedCart[index].quantity * updatedCart[index].prices[0].amount,
          0,
        )
        .toFixed(2);

      return {
        ...state,
        cart: updatedCart,
        productsTotal: updatedProductsTotal,
        totalPrice: updatedTotalPrice,
      };
    },
  },
});

export default cartSlice;
