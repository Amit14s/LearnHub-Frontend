import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

const savedUser = localStorage.getItem("user");

const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null
};


// REGISTER
export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const res = await API.post("/auth/register", data);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            return res.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);


// LOGIN
export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await API.post("/auth/login", data);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            return res.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);


// GET CURRENT USER
export const getMe = createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
        try {
            const res = await API.get("/auth/me");

            localStorage.setItem("user", JSON.stringify(res.data.user));

            return res.data.user;
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Session expired"
            );
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.loading = false;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },

    extraReducers: (builder) => {

        builder

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
            })

            .addCase(getMe.rejected, (state) => {
                state.user = null;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;