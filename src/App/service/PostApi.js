import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3031/' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => 'posts',
        }),
        addPost: builder.mutation({
            query: (addNewPost) => ({
                url: 'posts',
                method: 'POST',
                body: addNewPost,
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetPostsQuery,
    useDeletePostMutation,
    useAddPostMutation,
} = postApi;
