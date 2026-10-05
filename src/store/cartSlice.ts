import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../types";

type CartState = {
  items: Product[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    toggleCart: (
      state,
      action: PayloadAction<Product>
    ) => {
      const product = action.payload;

      const alreadyAdded = state.items.some(
        (item) => item.id === product.id
      );

      if (alreadyAdded) {
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.items.push(product);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

