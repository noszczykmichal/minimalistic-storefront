import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], productsTotal: 0 };

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

      return {
        ...state,
        cart: updatedCart,
        productsTotal: updatedProductsTotal,
      };
    },
  },
});

export default cartSlice;
