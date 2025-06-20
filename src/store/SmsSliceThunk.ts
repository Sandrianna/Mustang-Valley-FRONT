import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SmsValues } from "../interfaces";

export const fetchSmsInit = createAsyncThunk(
    "init-sms/fetchSmsInit",
    async(phoneNumber: string)=> {
        const response = await axios.post("http://localhost:3000/auth/init-sms", phoneNumber, { withCredentials: true });
        return response.data.sessionId;
    }
)

export const fetchSmsVerify = createAsyncThunk(
    "verify-sms/fetchSmsVerify",
    async({sessionId, code}: {sessionId: string | null, code: string}) => {
        const response = await axios.post("http://localhost:3000/auth/verify-sms", {sessionId, code}, { withCredentials: true });
        return response.data.status;
    }
)

const initialState: SmsValues = {
    phone: "",
    code: "",
    sessionId: null,
    status: "",

}

const smsSlice = createSlice ({
    name: "sms",
    initialState,
    reducers: {
        setPhoneNumber: (state, action) => {
            state.phone = action.payload;
        },
        setCode: (state, action) => {
            state.code = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSmsInit.pending, (state)=> {
                state.status = "loading";
            })
            .addCase(fetchSmsInit.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.sessionId = action.payload;
            })
            .addCase(fetchSmsInit.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(fetchSmsVerify.pending, (state)=> {
                state.status = "loading";
            })
            .addCase(fetchSmsVerify.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.code = action.payload;
            })
            .addCase(fetchSmsVerify.rejected, (state) => {
                state.status = "failed";
            })
            
        
    }
})

export const {setCode, setPhoneNumber} = smsSlice.actions;
export default smsSlice.reducer;
