import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk(
    "login/fetchLogin",
    async(userData, {rejectWithValue}) => {
        try{
            const response = await axios.post("http://localhost:3000/auth/login",
        {
          username: userData.username.trim(),
          password: userData.password.trim(),
        },
        { withCredentials: true });
        if(response.status === 201){
            return userData.username;
            
        }
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Ошибка при входе");
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {
        user:null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchLogin.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            });
    },
});

export const {logout} = loginSlice.actions;
export default loginSlice.reducer;