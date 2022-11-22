/* eslint-disable no-unused-vars */
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = { cart: [], productsTotal: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const cart = [...state.cart];
      let updatedCart = [];
      const incomingProduct = JSON.parse(JSON.stringify(action.payload));
      // console.log("incoming: ", incomingProduct);
      if (cart.length > 0) {
        /* checking whether the product with given id is already in the cart */
        const filteredCart = cart.filter(
          (product) => product.id === incomingProduct.id,
        );

        if (filteredCart.length > 0) {
          const isEqual = filteredCart.map((product) => {
            return product.attributes.map((attribute, index) => {
              const incomProdSingleAttribute =
                incomingProduct.attributes[index];

              return attribute.items.every((attributeItem) => {
                return incomProdSingleAttribute.items.some(
                  (incomingProdOption) => {
                    console.log(
                      "[JSON.stringify(incomingProdOption)] :",
                      JSON.stringify(incomingProdOption),
                      "[ JSON.stringify(attributeItem)]: ",
                      JSON.stringify(attributeItem),
                    );

                    return (
                      JSON.stringify(incomingProdOption) ===
                      JSON.stringify(attributeItem)
                    );
                  },
                );
              });
            });
          });
          console.log("isEqual: ", isEqual);
          updatedCart = [...cart];
        } else {
          /* cart is not empty, no other products with given id; product can be added without attributes checking */
          incomingProduct.quantity = 1;
          updatedCart = [...cart];
          updatedCart.push(incomingProduct);
        }
      } else {
        /* cart empty, a new product can be safely added to the cart */
        incomingProduct.quantity = 1;
        updatedCart.push(incomingProduct);
      }

      return { ...state, cart: updatedCart, productsTotal: updatedCart.length };

      // const updatedCart = [...state.cart].concat(action.payload);
      // const updatedProductsTotal = updatedCart.length;
      // return {
      //   ...state,
      //   cart: updatedCart,
      //   productsTotal: updatedProductsTotal,
      // };
    },
  },
});

export default cartSlice;
