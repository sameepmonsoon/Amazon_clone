import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state: any, action: any) {
      (state.isLoading = false), (state.currentUser = action.payload);
    },
    loginSuccess: (state, action) => {
      (state.isLoading = false), (state.currentUser = action.payload);
    },
    loginFailure: (state) => {
      (state.isLoading = true), (state.error = true);
    },
    logout(state: any) {
      return initialState;
    },
  },
});

export const { login, loginFailure, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
