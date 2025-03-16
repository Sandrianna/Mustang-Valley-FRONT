import {configureStore} from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice.ts";
import snackbarReducer from "./snackbarSlice.ts";
import authReducer from "./authSlice.ts";


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        snackbar: snackbarReducer,
        auth: authReducer,
    },
});

export default store;