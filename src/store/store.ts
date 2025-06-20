import {configureStore} from "@reduxjs/toolkit";
import snackbarReducer from "./snackbarSlice.ts";
import profileReducer from "./profileSliceThunk.ts";
import loginReducer from "./loginSliceThunk.ts"
import signUpReducer from "./signSliceThunk.ts";
import galleryReducer from "./gallerySliceThunk.ts";
import bookingReducer from "./bookingSliceThunk.ts";
import smsReducer from "./SmsSliceThunk.ts";
import adminReducer from "./adminSlice.ts"


export const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        snackbar: snackbarReducer,
        profile: profileReducer,
        login: loginReducer,
        registration: signUpReducer,
        smsReducer: smsReducer,
        booking: bookingReducer,
        admin: adminReducer,
    },
});

export default store;

