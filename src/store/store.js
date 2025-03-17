import {configureStore} from "@reduxjs/toolkit";
import snackbarReducer from "./snackbarSlice.ts";
import profileReducer from "./profileSliceThunk.js";
import loginReducer from "./loginSliceThunk.js";
import signUpReducer from "./signSliceThunk.js";
import galleryReducer from "./gallerySliceThunk.js"


export const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        snackbar: snackbarReducer,
        profile: profileReducer,
        login: loginReducer,
        registration: signUpReducer,
    },
});

export default store;