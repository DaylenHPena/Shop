import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiAuthService from "../../services/ApiAuthService";
import TokenService from "../../lib/TokenService";
import ApiService from "../../services/ApiService";

export const STATUS = {
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  IDLE: "idle",
};

const initialState = {
  username: TokenService.getUsername(),
  status: STATUS.IDLE,
};

export const login = createAsyncThunk(
  "users/login",
  async (values, thunkAPI) => {
    return new Promise((resolve, reject) => {
      ApiAuthService.getToken(values)
        .then((data) => {
          TokenService.updateAuthTokens(data);
          const userId = TokenService.getUserId();
          userId
            ? ApiService.retrieveUser(userId).then((data) => resolve(data))
            : reject("error");
        })
        .catch((error) => {
          console.log('error thunk', error)
          reject(error)});
    });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      TokenService.removeTokens();
      state.username = null;
      state.status=STATUS.IDLE
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.username = action.payload?.username;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = STATUS.FAILED;
      console.log("rejected action.payload", action.payload);
    });
  },
});

export const selectUsername = (state) => state.user.username;

export const userActions = userSlice.actions;

export default userSlice.reducer;
