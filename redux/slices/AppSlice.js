import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken: null,
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action) =>
      (state = { ...state, jwtToken: action.payload }),
  },
});

export const { setToken } = AppSlice.actions;

export default AppSlice;
