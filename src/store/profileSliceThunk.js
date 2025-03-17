import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async(_, {rejectWithValue}) => {
        try {
            const response = await axios.get("http://localhost:3000/auth/profile",  { withCredentials: true });
            return response.data.user;
            
        } catch(error){
            return rejectWithValue("Ошибка загрузки профиля");
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        status: "idle",
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.profile = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },

});

export const {clearProfile} = profileSlice.actions;
export default profileSlice.reducer;