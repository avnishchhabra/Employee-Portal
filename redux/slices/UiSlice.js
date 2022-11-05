import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) =>
      (state = { ...state, loading: action.payload }),
  },
});

export const { setLoading } = UiSlice.actions;

export default UiSlice;
