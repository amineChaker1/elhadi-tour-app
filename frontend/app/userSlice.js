import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return (state = null);
    },
  },
});
export const { setUser, logout } = userSlice.actions;
