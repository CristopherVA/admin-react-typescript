import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { userApi } from '../services/userApi';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(authApi.middleware)
})