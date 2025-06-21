import { createSlice } from "@reduxjs/toolkit";

import { INITIAL_STATE } from "./user.state";

// Async Thunks functions
import {
  registerUserAsync,
  loginUserAsync,
  logOutUserAsync,
  sendVerificationOtpAsync,
  verifyUserAsync,
  sendResetPasswordOtpAsync,
  resetPasswordAsync,
  verifyResetOtpAsync,
} from "./user.asyncThunks";

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // register user in database
      .addCase(registerUserAsync.pending, (state) => {
        state.loading.register = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading.register = false;
        state.success.register = true;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading.register = false;
        state.error.register = true;
        state.errorMessage = action.payload;
      })
      // login user
      .addCase(loginUserAsync.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading.login = false;
        state.success.login = true;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login = true;
        state.errorMessage = action.payload;
      })
      // logout user
      .addCase(logOutUserAsync.pending, (state) => {
        state.loading.logout = true;
      })
      .addCase(logOutUserAsync.fulfilled, (state) => {
        state.loading.logout = false;
        state.success.logout = true;
        state.currentUser = null;
        state.isLoggedIn = false;
      })
      .addCase(logOutUserAsync.rejected, (state, action) => {
        state.loading.logout = false;
        state.error.logout = true;
        state.errorMessage = action.payload;
      })
      // send verification otp
      .addCase(sendVerificationOtpAsync.pending, (state) => {
        state.loading.sendVerifyOtp = true;
      })
      .addCase(sendVerificationOtpAsync.fulfilled, (state) => {
        state.loading.sendVerifyOtp = false;
        state.success.sendVerifyOtp = true;
      })
      .addCase(sendVerificationOtpAsync.rejected, (state, action) => {
        state.loading.sendVerifyOtp = false;
        state.error.sendVerifyOtp = true;
        state.errorMessage = action.payload;
      })
      // verify user
      .addCase(verifyUserAsync.pending, (state) => {
        state.loading.verifyUser = true;
      })
      .addCase(verifyUserAsync.fulfilled, (state) => {
        state.loading.verifyUser = false;
        state.success.verifyUser = true;
      })
      .addCase(verifyUserAsync.rejected, (state, action) => {
        state.loading.verifyUser = false;
        state.error.verifyUser = true;
        state.errorMessage = action.payload;
      })
      // send reset password otp
      .addCase(sendResetPasswordOtpAsync.pending, (state) => {
        state.loading.sendResetOtp = true;
      })
      .addCase(sendResetPasswordOtpAsync.fulfilled, (state) => {
        state.loading.sendResetOtp = false;
        state.success.sendResetOtp = true;
      })
      .addCase(sendResetPasswordOtpAsync.rejected, (state, action) => {
        state.loading.sendResetOtp = false;
        state.error.sendResetOtp = true;
        state.errorMessage = action.payload;
      })
      // verify reset otp
      .addCase(verifyResetOtpAsync.pending, (state) => {
        state.loading.verifyResetOtp = true;
      })
      .addCase(verifyResetOtpAsync.fulfilled, (state) => {
        state.loading.verifyResetOtp = false;
        state.success.verifyResetOtp = true;
      })
      .addCase(verifyResetOtpAsync.rejected, (state, action) => {
        state.loading.verifyResetOtp = false;
        state.error.verifyResetOtp = true;
        state.errorMessage = action.payload;
      })
      // reset password
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading.resetPassword = true;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.loading.resetPassword = false;
        state.success.resetPassword = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading.resetPassword = false;
        state.success.resetPassword = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
