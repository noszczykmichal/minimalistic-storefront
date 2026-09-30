import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingAddress } from "@/utils/form/schemas";

const initialState: { draft: Partial<ShippingAddress> } = { draft: {} };

const shippingAddress = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    saveDraft(state, action: PayloadAction<Partial<ShippingAddress>>) {
      state.draft = action.payload;
    },
    clearShippingAddress() {
      return initialState;
    },
  },
});

export const shippingAddressActions = shippingAddress.actions;

export default shippingAddress;
