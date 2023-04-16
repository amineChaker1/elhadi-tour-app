import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4321/auth",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "",
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddUserMutation, useGetUsersQuery, useLoginUserMutation } =
  apiSlice;
