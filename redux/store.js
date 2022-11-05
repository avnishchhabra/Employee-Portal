import {  configureStore } from "@reduxjs/toolkit";
import AppSlice from "./slices/AppSlice";
import UiSlice from "./slices/UiSlice";

const store = configureStore({
    reducer: {
        ui: UiSlice.reducer,
        app: AppSlice.reducer
    },
});

export default store