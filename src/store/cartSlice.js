import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], productsTotal: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const updatedCart = [...state.cart].concat(action.payload);
      const updatedProductsTotal = updatedCart.length;
      return {
        ...state,
        cart: updatedCart,
        productsTotal: updatedProductsTotal,
      };
    },
  },
});

export default cartSlice;
