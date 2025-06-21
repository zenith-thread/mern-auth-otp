import { createSelector } from "@reduxjs/toolkit";

const selectResetPasswordReducer = (state) => state.resetPassword;

export const selectOtp = createSelector(
  [selectResetPasswordReducer],
  (resetPassword) => resetPassword.otp
);

export const selectEmail = createSelector(
  [selectResetPasswordReducer],
  (resetPassword) => resetPassword.email
);

export const selectEnterEmailPhase = createSelector(
  [selectResetPasswordReducer],
  (resetPassword) => resetPassword.enterEmailPhase
);

export const selectResetOtpPhase = createSelector(
  [selectResetPasswordReducer],
  (resetPassword) => resetPassword.resetOtpPhase
);

export const selectNewPasswordPhase = createSelector(
  [selectResetPasswordReducer],
  (resetPassword) => resetPassword.newPasswordPhase
);

export const selectDonePhase = createSelector(
  [selectResetPasswordReducer],
  (resetPassword) => resetPassword.donePhase
);
