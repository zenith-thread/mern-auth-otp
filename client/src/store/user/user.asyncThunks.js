import { createAsyncThunk } from "@reduxjs/toolkit";

// Api functions
import {
  registerUserInDatabase,
  loginUserWithEmailAndPassword,
  getUserData,
  logoutUser,
  sendVerificationOtp,
  verifyUser,
  sendResetPasswordOtp,
  verifyResetOtp,
  resetPassword,
} from "../../api/auth";

export const registerUserAsync = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { success } = await registerUserInDatabase(name, email, password);
      if (success) {
        const user = await getUserData();
        return user;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { success, message } = await loginUserWithEmailAndPassword(
        email,
        password
      );
      if (success) {
        const user = await getUserData();
        return user;
      }
      return message;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logOutUserAsync = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { success } = await logoutUser();
      return success;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendVerificationOtpAsync = createAsyncThunk(
  "user/verificationOtp",
  async (_, { rejectWithValue }) => {
    try {
      const { success } = await sendVerificationOtp();
      return success;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const verifyUserAsync = createAsyncThunk(
  "user/verifyUser",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const { success } = await verifyUser(otp);
      return success;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendResetPasswordOtpAsync = createAsyncThunk(
  "user/resetPasswordOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { success } = await sendResetPasswordOtp(email);
      return success;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const verifyResetOtpAsync = createAsyncThunk(
  "user/verifyResetOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { success } = await verifyResetOtp(email, otp);
      return success;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async ({ email, newPassword, otp }, { rejectWithValue }) => {
    try {
      const { success } = await resetPassword(email, newPassword, otp);
      return success;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
