import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idUser: null,
  login: null,
  typeUser: "client",
  data: {},
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
      state.idUser = null;
      state.typeUser = "client";
      state.data = {};
    },
    typeUser: (state, action) => {
      state.typeUser = action.payload;
    },
    idUser: (state, action) => {
      state.idUser = action.payload;
    },
    data: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { login, logout, typeUser, idUser, data } = userSlice.actions;

export default userSlice.reducer;