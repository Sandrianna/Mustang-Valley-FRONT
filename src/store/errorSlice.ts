import {createSlice} from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {errorMessage: ""},
    reducers: {
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = "";
        },
    },
});

export const {setErrorMessage, clearErrorMessage} = errorSlice.actions;
export default errorSlice.reducer;