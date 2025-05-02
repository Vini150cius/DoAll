import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idUser: null,
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
    },
    idUser: (state, action) => {
      state.idUser = action.payload;
    },
  },
});

export const {login, logout, typeUser, idUser} = userSlice.actions;

export default userSlice.reducer;