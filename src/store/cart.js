import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [], cartTotalAmount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      state.cartTotalAmount += action.payload.price * action.payload.quantity;
      const cartExist = state.cartItems.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (cartExist !== -1) {
        // console.log(cartExist);
        state.cartItems[cartExist] = {
          ...state.cartItems[cartExist],
          quantity:
            state.cartItems[cartExist].quantity + action.payload.quantity,
        };
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeCart(state, action) {
      const cartExist = state.cartItems.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (state.cartItems[cartExist].quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cart) => cart.id !== action.payload.id
        );
      } else {
        state.cartItems[cartExist] = {
          ...state.cartItems[cartExist],
          quantity: state.cartItems[cartExist].quantity - 1,
        };
        state.cartTotalAmount -= state.cartItems[cartExist].price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
