import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://elhadi.onrender.com/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "",
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "auth/",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    addPlaceImage: builder.mutation({
      query: (data) => ({
        url: "uploadByLink",
        method: "POST",
        body: data,
      }),
    }),
    getPlaces: builder.query({
      query: () => "place",
    }),
    getSinglePlace: builder.query({
      query: (id) => `place/${id}`,
    }),
    updateSinglePlace: builder.mutation({
      query: (data) => ({
        url: `place/${data.updateId}`,
        method: "PUT",
        body: data,
      }),
    }),
    addNewPlace: builder.mutation({
      query: (data) => ({
        url: "place",
        method: "POST",
        body: data,
      }),
    }),
    addNewBooking: builder.mutation({
      query: (data) => ({
        url: "booking",
        method: "POST",
        body: data,
      }),
    }),
    getBooking: builder.mutation({
      query: (data) => ({
        url: "booking/get",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useLoginUserMutation,
  useAddPlaceImageMutation,
  useAddNewPlaceMutation,
  useGetPlacesQuery,
  useGetSinglePlaceQuery,
  useUpdateSinglePlaceMutation,
  useAddNewBookingMutation,
  useGetBookingMutation,
} = apiSlice;
