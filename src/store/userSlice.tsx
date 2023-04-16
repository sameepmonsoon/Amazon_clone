import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "[]") || null,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state: any, action: any) {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      Cookies.set("userToken", action.payload.token);
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isLoading = true;
      state.error = true;
    },
    logout(state: any) {
      localStorage.removeItem("currentUser");
      Cookies.remove("userToken");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === "user/login/pending",
      (state) => {
        state.isLoading = true;
      }
    );
  },
});

export const { login, loginFailure, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
