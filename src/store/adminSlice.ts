import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../interfaces";

interface AdminState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}



export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/admin/users", {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${userId}`, {
        withCredentials: true,
      });
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState: AdminState = {
  users: [],
  status: "idle",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;