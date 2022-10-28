import { createSlice } from "@reduxjs/toolkit";

const initialState = { categories: [] };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    saveCategories(state, action) {
      return { categories: state.categories.concat(action.payload) };
    },
  },
});

export default uiSlice;
