import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BookingData, BookingState } from "../interfaces";

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: BookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/bookings/reservation",
        bookingData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 
                            (error.response?.status === 401 ? 
                             'Необходима авторизация' : 
                             'Ошибка при бронировании');
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue("Неизвестная ошибка при бронировании");
    }
  }
);

export const checkDateAvailability = createAsyncThunk(
  "booking/checkDateAvailability",
  async (dates: { checkInDate: Date; checkOutDate: Date }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/bookings/check-availability",
        dates,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue("Неизвестная ошибка при проверке дат");
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/bookings/booking",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("Неизвестная ошибка при получении бронирований");
    }
  }
);

export const fetchAvailableDates = createAsyncThunk(
  "booking/fetchAvailableDates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/bookings/available-dates",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("Неизвестная ошибка при получении доступных дат");
    }
  }
);

export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/bookings",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("Неизвестная ошибка при получении всех бронирований");
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/bookings/${bookingId}`,
        { withCredentials: true }
      );
      return bookingId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("Неизвестная ошибка при удалении бронирования");
    }
  }
);

const initialState: BookingState = {
  booking: null,
  status: "idle",
  bookings: [],
  error: null,
  availability: {
    status: "idle",
    isAvailable: true,
    error: null,
    unavailableDates: [],
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.status = "idle";
      state.error = null;
      state.availability.status = "idle";
      state.availability.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkDateAvailability.pending, (state) => {
        state.availability.status = "loading";
        state.availability.error = null;
      })
      .addCase(checkDateAvailability.fulfilled, (state, action) => {
        state.availability.status = "succeeded";
        state.availability.isAvailable = action.payload.isAvailable;
      })
      .addCase(checkDateAvailability.rejected, (state, action) => {
        state.availability.status = "failed";
        state.availability.error = action.payload as string;
      })
      .addCase(createBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchAvailableDates.pending, (state) => {
        state.availability.status = "loading";
        state.availability.error = null;
      })
      .addCase(fetchAvailableDates.fulfilled, (state, action) => {
        state.availability.status = "succeeded";
        state.availability.unavailableDates = action.payload.unavailableDates;
      })
      .addCase(fetchAvailableDates.rejected, (state, action) => {
        state.availability.status = "failed";
        state.availability.error = action.payload as string;
      })
       .addCase(fetchAllBookings.pending, (state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(fetchAllBookings.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.bookings = action.payload;
  })
  .addCase(fetchAllBookings.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.payload as string;
  })
  .addCase(deleteBooking.fulfilled, (state, action) => {
    state.bookings = state.bookings.filter(
      booking => booking._id !== action.payload
    );
  });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;