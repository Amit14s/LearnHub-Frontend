import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchWebinars = createAsyncThunk(
    "webinars/fetch",
    async (params = {}, thunkAPI) => {
        try {
            const res = await API.get("/webinars", { params });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch webinars"
            );
        }
    }
);

const webinarSlice = createSlice({
    name: "webinars",

    initialState: {
        webinars: [],
        loading: false,
        error: null,
        total: 0,
        pages: 0
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchWebinars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWebinars.fulfilled, (state, action) => {
                state.loading = false;
                state.webinars = action.payload.webinars;
                state.total = action.payload.total;
                state.pages = action.payload.pages;
            })
            .addCase(fetchWebinars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default webinarSlice.reducer;