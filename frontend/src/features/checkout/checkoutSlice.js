import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  payment: undefined,
  address: undefined,
  succeded:false,
  triggered:false,
  data:{},
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
      console.log("state :>> ", current(state));
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setSucced: (state, action) => {
      state.succeded = action.payload;
      console.log("state :>> ",  current(state));
    },
    setTriggered: (state, action) => {
      state.triggered = action.payload;
      console.log("state :>> ",  current(state));
    },
    setData: (state, action) => {
      state.data = action.payload;
      console.log("state :>> ",  current(state));
    },
  },
});

export const selectPayment = (state) => state.checkout.payment;
export const selectAddress = (state) => state.checkout.address;
export const selectTriggered = (state) => state.checkout.triggered;
export const selectSucceded = (state) => state.checkout.succeded;
export const selectInitialData = (state) => state.checkout.data;

export const checkoutActions = checkoutSlice.actions;

export default checkoutSlice.reducer;
