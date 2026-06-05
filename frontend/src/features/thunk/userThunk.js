import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from '../../api/axios'

// we use thunkAPI for error handle. this is helping object redux give us..

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users");

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
      const response = await api.post(
        "/users",
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
      const response = await api.put(
        `/users/${id}`,
        userData
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete user

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/users/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);