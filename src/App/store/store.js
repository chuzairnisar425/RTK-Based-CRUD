import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../slice/PostSlice.js'
import { postApi } from "../service/PostApi.js";

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        posts: postReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware)
})
