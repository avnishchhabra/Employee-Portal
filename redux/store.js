import {  configureStore } from "@reduxjs/toolkit";
import UiSlice from "./slices/UiSlice";

const store = configureStore({
    reducer: {
        campaigns: UiSlice.reducer,
    },
});

export default store