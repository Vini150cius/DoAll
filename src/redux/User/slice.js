import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginClient: (state) => {
      state.login = "client";
    },
    loginProfissional: (state) => {
      state.login = "profissional";
    },
    logout: (state) => {
      state.login = null;
    },
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;