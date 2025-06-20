import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProfileValues, Username } from '../interfaces';

export const fetchProfile = createAsyncThunk<Username>(
  'profile/fetchProfile',
  async () => {
    const response = await axios.get('http://localhost:3000/auth/profile', {
      withCredentials: true,
    });
    return response.data.user;
  }
);

export const updateProfile = createAsyncThunk<Username, FormData>(
  'profile/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/update-profile',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Ошибка обновления профиля');
    }
  }
);

export const updatePreferences = createAsyncThunk<Username, { userId:string; favoriteOptions: string; specialWishes: string }>(
  'profile/updatePreferences',
  async (prefs) => {
    const response = await axios.post('http://localhost:3000/auth/preferences', prefs, {
      withCredentials: true,
    });
    console.log(response.data.user)
    return response.data.user;
  }
);

const initialState: ProfileValues = {
  profileUser: null,
  status: 'idle',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profileUser = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileUser = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(updatePreferences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileUser = action.payload;
      })
      .addCase(updatePreferences.rejected, (state) => {
        state.status = 'failed';
      })


}});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
