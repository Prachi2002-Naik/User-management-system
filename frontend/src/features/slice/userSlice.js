import { createSlice } from "@reduxjs/toolkit";
import {createUser, fetchUsers, updateUser, deleteUser} from '../thunk/userThunk'

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers:(builder) => {
    builder
          //  create user
          .addCase(createUser.pending, (state) => {
            state.loading = true;
          })
          
          .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
          
            // New user list chya top la add hoil
            state.users.unshift(action.payload);
          })
          
          .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })


          // get all users
          // Pending
          .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
    
          // Fulfilled
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
    
          // Rejected
          .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

          // Update User
        .addCase(updateUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.loading = false;

          state.users = state.users.map((user) =>
            user._id === action.payload._id
              ? action.payload
              : user
          )
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Delete User
        // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }

});

export default userSlice.reducer;