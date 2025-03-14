import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: { open: false,
        message: "",},
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