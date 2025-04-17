import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPost: null,
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload
        }
    }
})

const { setSelectedPost } = postSlice.actions;

export default postSlice.reducer