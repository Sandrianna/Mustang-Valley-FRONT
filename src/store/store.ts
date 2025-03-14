import {configureStore} from "@reduxjs/toolkit";
import errorReducer from "./errorSlice.ts";
import loadingReducer from "./loadingSlice.ts"
import snackbarReducer from "./snackbarSlice.ts"


export const store = configureStore({
    reducer: {
        error: errorReducer,
        loading: loadingReducer,
        snackbar: snackbarReducer,
    },
});

export default store;