import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginValues } from "../interfaces";
import axios from "axios";

export const fetchLogin = createAsyncThunk<{ username: string; role: string } | null, {username: string; password: string}>(
  "login/fetchLogin",
  async (userData, { rejectWithValue }) => {
    try {

      const loginResponse = await axios.post(
        "http://localhost:3000/auth/login",
        {
          username: userData.username.trim(),
          password: userData.password.trim(),
        },
        { withCredentials: true }
      );

      const profileRes = await axios.get("http://localhost:3000/auth/profile", {
        withCredentials: true,
      });

      const { user } = profileRes.data;
      return { username: user.username, role: user.role }; 
    } catch (err: any) {
      if (err.response) {
        return rejectWithValue(err.response.data.message || err.response.statusText);
      }
      return rejectWithValue("Login or profile fetch failed");
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
                state.user = action.payload ?? null;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const {logout} = loginSlice.actions;
export default loginSlice.reducer;