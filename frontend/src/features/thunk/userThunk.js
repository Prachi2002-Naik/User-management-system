import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// we use thunkAPI for error handle. this is helping object redux give us..

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
         "https://user-management-system-lkzz.onrender.com/api/users"
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://user-management-system-lkzz.onrender.com/api/users",
        userData
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// update user 

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://user-management-system-lkzz.onrender.com/api/users/${id}`,
        userData
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);