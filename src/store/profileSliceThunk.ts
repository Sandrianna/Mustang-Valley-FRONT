import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileValues, Username } from "../interfaces";
import axios from "axios";

export const fetchProfile = createAsyncThunk<Username>(
    "profile/fetchProfile",
    async() => {
        const response = await axios.get("http://localhost:3000/auth/profile",  { withCredentials: true });
            return response.data.user;
            
       
    }
);

const initialState: ProfileValues= {
    profileUser: null,
    status: "idle",
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.profileUser = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profileUser = action.payload;
            })
            .addCase(fetchProfile.rejected, (state) => {
                state.status = "failed";
            });
    },

});

export const {clearProfile} = profileSlice.actions;
export default profileSlice.reducer;