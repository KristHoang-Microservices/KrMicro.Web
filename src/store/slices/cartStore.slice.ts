import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "@/models/cart.model";
import { localStorageServices } from "@/service";
import { cartLocalStorageKey } from "@/constants";
import { RootState } from "@/store/store";

const initialState: Cart = localStorageServices.get<Cart>(
  cartLocalStorageKey,
) ?? { items: [], total: 0 };

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => {
      localStorageServices.set<Cart>(cartLocalStorageKey, initialState);
      return initialState;
    },
    insert: (state, action: PayloadAction<CartItem>) => {
      const existedIndex: number = state.items.findIndex(
        (i: CartItem) =>
          i.productId === action.payload.productId &&
          i.sizeCode === action.payload.sizeCode,
      );

      if (existedIndex === -1) {
        state.items.push(action.payload);
      } else {
        state.items[existedIndex].amount++;
      }

      state.total = state.items.reduce(
        (val, item) => val + item.amount * item.price,
        0,
      );

      localStorageServices.set<Cart>(cartLocalStorageKey, state);
    },
    remove: (state, action: PayloadAction<CartItem>) => {
      const existedIndex: number = state.items.findIndex(
        (i: CartItem) =>
          i.productId === action.payload.productId &&
          i.sizeCode === action.payload.sizeCode,
      );

      if (state.items[existedIndex].amount === 1) {
        state.items = state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.sizeCode === action.payload.sizeCode
            ),
        );
      } else {
        state.items[existedIndex].amount--;
      }
      state.total = state.items.reduce(
        (val, item) => val + item.amount * item.price,
        0,
      );
      localStorageServices.set<Cart>(cartLocalStorageKey, state);
    },
    update: (state, action: PayloadAction<CartItem>) => {
      const index: number = state.items.findIndex(
        (i: CartItem) =>
          i.productId === action.payload.productId &&
          i.sizeCode === action.payload.sizeCode,
      );
      state.items[index] = action.payload;
      state.total = state.items.reduce(
        (val, item) => val + item.amount * item.price,
        0,
      );
      localStorageServices.set<Cart>(cartLocalStorageKey, state);
    },
  },
});

export const { remove, reset, insert, update } = cart.actions;

export const cartSelector = (state: RootState) => state.cartReducer;
export default cart.reducer;
