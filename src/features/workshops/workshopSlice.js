import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchWorkshops = createAsyncThunk(
    "workshops/fetch",
    async (params = {}, thunkAPI) => {
        try {
            const res = await API.get("/workshops", { params });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch workshops"
            );
        }
    }
);

const workshopSlice = createSlice({
    name: "workshops",

    initialState: {
        workshops: [],
        loading: false,
        error: null,
        total: 0,
        pages: 0
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkshops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkshops.fulfilled, (state, action) => {
                state.loading = false;
                state.workshops = action.payload.workshops;
                state.total = action.payload.total;
                state.pages = action.payload.pages;
            })
            .addCase(fetchWorkshops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default workshopSlice.reducer;