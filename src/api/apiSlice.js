import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://jsonplaceholder.typicode.com/users/1/albums

// https://jsonplaceholder.typicode.com/posts/${id}

// https://jsonplaceholder.typicode.com/posts?userId=${id}


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    
    getAlbums: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/albums`,
      }),
      providesTags: ["Albums"],
    }),

    getPosts: builder.query({
      query: (userId) => ({
        url: `/posts?userId=${userId}`,
      }),
      providesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useGetAlbumsQuery, useGetPostsQuery, useDeletePostMutation } =
  apiSlice;
