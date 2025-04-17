import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3031/' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => 'posts',
        }),
        // for add post
        addPost: builder.mutation({
            query: (addNewPost) => ({
                url: 'posts',
                method: 'POST',
                body: addNewPost,
            }),
        }),
        // for delete post 
        deletePost: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
        }),
        // for update post
        updatePost: builder.mutation({
            query: ({ id, ...updatedPost }) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: updatedPost,
            }),
            invalidatesTags: ['Posts'],
        }),


    }),
});

export const {
    useGetPostsQuery,
    useDeletePostMutation,
    useAddPostMutation,
    useUpdatePostMutation
} = postApi;
