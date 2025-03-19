import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GalleryValues} from "../interfaces/index.ts"
import axios from "axios";

export const fetchGallery = createAsyncThunk<string[] | void>(
    "profile/fetchProfile",
    async() => {
       
        const response = await axios.get("http://localhost:3000/users/me/images",  { withCredentials: true });
     
            return response.data.message;
         
       
    }
);

const initialState: GalleryValues = {
    images: [],
    status: "idle",
}

const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGallery.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGallery.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.images = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchGallery.rejected, (state) => {
                state.status = "failed";
            });
    },

});

export default gallerySlice.reducer;