import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGallery = createAsyncThunk(
    "profile/fetchProfile",
    async(_, {rejectWithValue}) => {
        try {
            const response = await axios.get("http://localhost:3000/users/me/images",  { withCredentials: true });
     
                 return response.data.message;
         
        } catch(error){
            return rejectWithValue("Ошибка загрузки изображений");
        }
    }
);

const gallerySlice = createSlice({
    name: "gallery",
    initialState: {
        images: [],
        status: "idle",
    },
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