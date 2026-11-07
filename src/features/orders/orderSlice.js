import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchMyOrders = createAsyncThunk(
    "orders/fetch",
    async (_, thunkAPI) => {
        try {
            const res = await API.get("/orders/my");
            return res.data.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch purchases"
            );
        }
    }
);

const orderSlice = createSlice({
    name: "orders",

    initialState: {
        orders: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;