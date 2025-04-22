import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  typeUser: "client",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
    logout: (state) => {
      state.login = null;
    },
    typeUser: (state, action) => {
      state.typeUser = action.payload;
    }
  },
});

export const {login, logout, typeUser} = userSlice.actions;

export default userSlice.reducer;