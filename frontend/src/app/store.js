import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import lastSeenReducer from "../features/lastSeen/lastSeenSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    lastseen: lastSeenReducer,
    checkout:checkoutReducer,
  },
});

export default store;
