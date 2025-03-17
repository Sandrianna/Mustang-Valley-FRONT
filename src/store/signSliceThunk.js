import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSignUp = createAsyncThunk(
    "registration/fetchSignUp",
    async(userData, {rejectWithValue}) => {
        try{
            const response = await axios.post(
                "http://localhost:3000/auth/register",
                {
                  username: userData.username.trim(),
                  password: userData.password.trim(),
                },
                { withCredentials: true }
                
              );
              return(userData.username);
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Неизвестная ошибка");
        }
    }

);

const signUpSlice = createSlice({
    name: "registration",
    initialState: {
        regUser: null,
        state: "idle",
    },
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
                state.status = "error";
            });
    },
});

export default signUpSlice.reducer;