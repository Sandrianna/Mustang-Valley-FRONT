import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignUpValues, UsernamePassword } from "../interfaces";

export const fetchSignUp = createAsyncThunk<void, UsernamePassword>(
    "registration/fetchSignUp",
    async(userData) => {
       
            await axios.post(
                "http://localhost:3000/auth/register",
                {
                  username: userData.username.trim(),
                  password: userData.password.trim(),
                },
                { withCredentials: true }
                
              );
      
    }

);

const initialState: SignUpValues= {
    regUser: null,
    status: "idle",
}

const signUpSlice = createSlice({
    name: "registration",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSignUp.pending, (state)=>{
                state.status = "loading";
            })
            .addCase(fetchSignUp.fulfilled, (state, action)=>{
                state.regUser = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchSignUp.rejected, (state)=> {
                state.status = "failed";
            });
    },
});

export default signUpSlice.reducer;