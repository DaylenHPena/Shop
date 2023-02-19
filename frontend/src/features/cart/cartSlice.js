import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";
import { current } from "@reduxjs/toolkit";

const initialState = {
  items: null,
  expired: null,
  total: 0,
};

const addItemAsync = createAsyncThunk(
  "cart/add_item",
  async ({ product, quantity }, thunkApi) =>
    ApiService.addToCart(product, quantity)
);

const updateItemAsync = createAsyncThunk(
  "cart/update_item",
  async ({ id, quantity }, thunkApi) => ApiService.updateCartItem(id, quantity)
);

export const removeItemAsync = createAsyncThunk(
  "cart/remove_item",
  async (id, thunkApi) => ApiService.removeFromCart(id)
);

export const emptyCartAsync = createAsyncThunk(
  "cart/empty_cart",
  async () => ApiService.emptyCart()
);

export const retrieveCartAsync = createAsyncThunk(
  "cart/retrieve_item",
  async () => ApiService.retrieveCart()
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId == action.payload.productId
      );
      if (item) {
        item.quantity = item.quantity - action.payload.quantity;
        state.items = [...state.items];
      }
    },
    emptyCart: (state) => {
      state.items = new Array();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemAsync.fulfilled, (state, action) => {
      if (state.items) {
        state.items = [...state.items, action.payload];
      } else {
        state.items = [action.payload];
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    });
    builder.addCase(retrieveCartAsync.fulfilled, (state, action) => {
      console.log("action.payload :>> ", action.payload);
      state.items = action.payload.filter((item) => item.product.inventory > 0);
      state.expired = action.payload.filter(
        (item) => item.product.inventory <= 0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    });
    builder.addCase(removeItemAsync.fulfilled, (state, action) => {
      console.log("action.payload :>> ", action.payload);
      if (state.items) {
        state.items = state.items.filter(
          (item) => item.id != action.payload.deleted_id
        );
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    });
    builder.addCase(updateItemAsync.fulfilled, (state, action) => {
      const items = state.items.filter((item) => item.id != action.payload.id);
      state.items = [action.payload, ...items];
    });
    builder.addCase(emptyCartAsync.fulfilled, (state, action) => {
      state.items = new Array();
    });
  },
});

export const selectCart = (state) => state.cart.items;
export const selectCartExpired = (state) => state.cart.expired;

export const calcAmmount = (previous, current) => {
  return (
    parseFloat(current.quantity) * parseFloat(current.product.price) +
    parseFloat(previous)
  ).toFixed(2);
};

export const totalItems = (cart) => {
  return cart
    ? cart.reduce((previous, current) => current.quantity + previous, 0)
    : 0;
};

export const addToCart =
  ({ product, quantity }) =>
  (dispatch, getState) => {
    const currentValue = selectCart(getState()) || [];
    const inCart = currentValue.find((item) => {
      return item.product.id == product;
    });
    if (inCart) {
      dispatch(
        updateItemAsync({ id: inCart.id, quantity: inCart.quantity + quantity })
      );
    } else {
      dispatch(addItemAsync({ product: product, quantity: quantity }));
    }
  };

export const increaseQty =
  ({ product }) =>
  (dispatch, getState) => {
    const currentValue = selectCart(getState()) || [];
    const inCart = currentValue.find((item) => {
      return item.product.id == product;
    });
    if (inCart) {
      dispatch(
        updateItemAsync({ id: inCart.id, quantity: inCart.quantity + 1 })
      );
    }
  };

export const decreaseQty =
  ({ product }) =>
  (dispatch, getState) => {
    const currentValue = selectCart(getState()) || [];
    const inCart = currentValue.find((item) => {
      return item.product.id == product;
    });
    if (inCart) {
      dispatch(
        updateItemAsync({ id: inCart.id, quantity: inCart.quantity - 1 })
      );
    }
  };

export const { emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
