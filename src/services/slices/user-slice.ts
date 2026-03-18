import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile
} from '../actions/auth-actions';

export type userState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
};

export const initialState: userState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getUserName: (state) => state.user.name,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });

    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.error = '';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isAuthChecked = false;
      state.user = { email: '', name: '' };
      state.error = '';
    });
  }
});

export const { isAuthCheckedSelector, getUser, getUserName, getError } =
  userSlice.selectors;

export const userReducer = userSlice.reducer;
