import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginValues, UsernamePassword } from "../interfaces";
import axios from "axios";

export const fetchLogin = createAsyncThunk<string | void, UsernamePassword>(
    "login/fetchLogin",
    async(userData) => {
        
            const response = await axios.post("http://localhost:3000/auth/login",
        {
          username: userData.username.trim(),
          password: userData.password.trim(),
        },
        { withCredentials: true });
        if(response.status === 201){
            return userData.username;
        }
      
    }
);

const initialState: LoginValues = {
    user:null,
    status: "idle",
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchLogin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const {logout} = loginSlice.actions;
export default loginSlice.reducer;