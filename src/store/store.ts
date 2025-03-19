import {configureStore} from "@reduxjs/toolkit";
import snackbarReducer from "./snackbarSlice.ts";
import profileReducer from "./profileSliceThunk.ts";
import loginReducer from "./loginSliceThunk.ts"
import signUpReducer from "./signSliceThunk.ts";
import galleryReducer from "./gallerySliceThunk.ts"


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