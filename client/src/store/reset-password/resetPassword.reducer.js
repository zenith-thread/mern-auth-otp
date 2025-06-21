import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  otp: 0,
  email: "",
  enterEmailPhase: true,
  resetOtpPhase: false,
  newPasswordPhase: false,
  donePhase: false,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: INITIAL_STATE,
  reducers: {
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setEmailToReset: (state, action) => {
      state.email = action.payload;
    },
    toggleResetOtp: (state) => {
      state.enterEmailPhase = false;
      state.resetOtpPhase = true;
    },
    toggleNewPassword: (state) => {
      state.resetOtpPhase = false;
      state.newPasswordPhase = true;
    },
    passwordChanged: (state) => {
      state.newPasswordPhase = false;
      state.donePhase = true;
    },
    toggleEnterEmailPhase: (state) => {
      state.donePhase = false;
      state.enterEmailPhase = true;
    },
  },
});

export const {
  setOtp,
  setEmailToReset,
  toggleResetOtp,
  toggleNewPassword,
  passwordChanged,
  toggleEnterEmailPhase,
} = resetPasswordSlice.actions;
export const resetPasswordReducer = resetPasswordSlice.reducer;
