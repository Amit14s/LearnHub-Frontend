import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import webinarReducer from "../features/webinars/webinarSlice";
import workshopReducer from "../features/workshops/workshopSlice";
import ebookReducer from "../features/ebooks/ebookSlice";
import orderReducer from "../features/orders/orderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        webinars: webinarReducer,
        workshops: workshopReducer,
        ebooks: ebookReducer,
        orders: orderReducer
    }
});