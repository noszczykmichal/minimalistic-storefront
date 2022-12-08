import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billingCurrency: "$",
  currentPDP: "",
  cart: [],
  productsTotal: 0,
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    onCurrencyChange(state, action) {
      const { cart } = state;
      const updatedTotalPrice = Object.keys(cart).reduce((acc, index) => {
        const filteredPrices = cart[index].prices.filter(
          (price) => price.currency.symbol === action.payload,
        );
        const [currentPrice] = filteredPrices;
        return acc + cart[index].quantity * currentPrice.amount;
      }, 0);

      return {
        ...state,
        billingCurrency: action.payload,
        totalPrice: updatedTotalPrice,
      };
    },
    onCurrentPDPChange(state, action) {
      return { ...state, currentPDP: action.payload };
    },
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

      updatedTotalPrice = Object.keys(updatedCart).reduce((acc, index) => {
        const filteredPrices = updatedCart[index].prices.filter(
          (price) => price.currency.symbol === state.billingCurrency,
        );
        const [currentPrice] = filteredPrices;
        return acc + updatedCart[index].quantity * currentPrice.amount;
      }, 0);

      return {
        ...state,
        cart: updatedCart,
        productsTotal: updatedProductsTotal,
        totalPrice: updatedTotalPrice,
      };
    },
    changeQuantity(state, action) {
      const updatedCart = JSON.parse(JSON.stringify(state.cart));
      const updatedProductIndex = updatedCart.findIndex(
        (product) => product.internalID === action.payload.internalID,
      );
      if (action.payload.operationType === "addition") {
        const updatedQuantity = updatedCart[updatedProductIndex].quantity + 1;
        updatedCart[updatedProductIndex].quantity = updatedQuantity;
      } else {
        const updatedQuantity = updatedCart[updatedProductIndex].quantity - 1;
        if (updatedQuantity > 0) {
          updatedCart[updatedProductIndex].quantity = updatedQuantity;
        } else {
          updatedCart.splice(updatedProductIndex, 1);
        }
      }

      const updatedProductsTotal = Object.keys(updatedCart).reduce(
        (acc, index) => acc + updatedCart[index].quantity,
        0,
      );

      const updatedTotalPrice = Object.keys(updatedCart).reduce(
        (acc, index) => {
          const filteredPrices = updatedCart[index].prices.filter(
            (price) => price.currency.symbol === state.billingCurrency,
          );
          const [currentPrice] = filteredPrices;
          return acc + updatedCart[index].quantity * currentPrice.amount;
        },
        0,
      );

      return {
        ...state,
        cart: updatedCart,
        productsTotal: updatedProductsTotal,
        totalPrice: updatedTotalPrice,
      };
    },
  },
});

export default productsSlice;
