import { createSlice } from "@reduxjs/toolkit";
const user =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : null;
export const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      console.log(state);
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return (state = null);
    },
  },
});
export const { setUser, logout } = userSlice.actions;
