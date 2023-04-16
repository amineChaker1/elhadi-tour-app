import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice.js";
import { userSlice } from "./userSlice.js";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
