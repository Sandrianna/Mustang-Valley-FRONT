import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {load: false},
    reducers: {
        startLoading: (state) => {
            state.load = true;
        },
        stopLoading: (state) => {
            state.load = false;
        },
    },
});

export const {startLoading, stopLoading} = loadingSlice.actions;
export default loadingSlice.reducer;