import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/slice/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});