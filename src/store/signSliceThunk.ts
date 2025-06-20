import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignUpValues, ExtendedUserForm } from "../interfaces";

export const fetchSignUp = createAsyncThunk<void, ExtendedUserForm>(
  "registration/fetchSignUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        {
          username: userData.username.trim(),
          password: userData.password.trim(),
          firstName: userData.firstName.trim(),
          lastName: userData.lastName.trim(),
          email: userData.email.trim(),
          phone: userData.phone.trim(),
          gender: userData.gender
        },
        { withCredentials: true }
      );
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const initialState: SignUpValues = {
  regUser: null,
  status: "idle",
};

const signUpSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    clearRegistration: (state) => {
      state.regUser = null;
      state.status = "idle";
   
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.regUser = action.payload;
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearRegistration } = signUpSlice.actions;
export default signUpSlice.reducer;