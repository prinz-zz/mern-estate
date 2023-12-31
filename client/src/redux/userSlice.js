import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updatedUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updatedUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutUserStart: (state) => {
      state.loading = true;
    },
    signoutUserSuccess: (state, action) => { 
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signoutUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

  },
});

export const {
  signInStart,
  signInSuccess,
  signInError,
  updateUserStart,
  updatedUserSuccess,
  updatedUserError,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserError,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserError
} = userSlice.actions;

export default userSlice.reducer;
