import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../service/postApi.js";
import postReducer from '../slice/PostSlice.js'

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        posts: postReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware)
})
