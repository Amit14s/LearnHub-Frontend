import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchEbooks = createAsyncThunk(
    "ebooks/fetch",
    async (params = {}, thunkAPI) => {
        try {
            const res = await API.get("/ebooks", { params });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch ebooks"
            );
        }
    }
);

const ebookSlice = createSlice({
    name: "ebooks",

    initialState: {
        ebooks: [],
        loading: false,
        error: null,
        total: 0,
        pages: 0
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchEbooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEbooks.fulfilled, (state, action) => {
                state.loading = false;
                state.ebooks = action.payload.ebooks;
                state.total = action.payload.total;
                state.pages = action.payload.pages;
            })
            .addCase(fetchEbooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default ebookSlice.reducer;