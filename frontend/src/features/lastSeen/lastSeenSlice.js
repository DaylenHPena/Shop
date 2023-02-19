import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LocalstorageManager from "../../lib/LocalstorageManager";

const LASTSEEN = "lastseen";
const initialState = {
  items: LocalstorageManager.localstorageGetItem(LASTSEEN) || [],
};

const lastSeenSlice = createSlice({
  name: "lastseen",
  initialState,
  reducers: {
    addLastSeen: (state, action) => {
      const items = state.items.filter((item) => item.id != action.payload.id);
      items.unshift(action.payload);
      items.length > 6 && items.pop();
      state.items = items;
      LocalstorageManager.localstorageSetItem(LASTSEEN, state.items);
    },
  },
});

export const selectLastSeen = (state) => state.lastseen.items.slice(1);
export const { addLastSeen } = lastSeenSlice.actions;
export default lastSeenSlice.reducer;
