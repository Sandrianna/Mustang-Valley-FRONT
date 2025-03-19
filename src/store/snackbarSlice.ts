import { createSlice } from "@reduxjs/toolkit";
import { SnackbarValues } from "../interfaces";

const initialState: SnackbarValues = {
    open: false,
    message: "",
}

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.open = true;
            state.message = action.payload;
        },
        closeSnackbar: (state) => {
            state.open = false;
        },
    },
});

export const {showSnackbar, closeSnackbar} = snackbarSlice.actions;
export default snackbarSlice.reducer;