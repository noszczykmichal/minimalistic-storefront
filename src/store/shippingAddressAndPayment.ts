import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressAndPaymentFormInput } from "@/utils/form/schemas";

const initialState: { draft: Partial<AddressAndPaymentFormInput> } = {
  draft: {},
};

const shippingAddressAndPayment = createSlice({
  name: "shippingAddressAndPayment",
  initialState,
  reducers: {
    saveDraft(
      state,
      action: PayloadAction<Partial<AddressAndPaymentFormInput>>,
    ) {
      state.draft = action.payload;
    },
    clearShippingAndPaymentData() {
      return initialState;
    },
  },
});

export const shippingAndPaymentActions = shippingAddressAndPayment.actions;

export default shippingAddressAndPayment;
