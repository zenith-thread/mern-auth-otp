import { createSelector } from "@reduxjs/toolkit";

const selectUserReducer = (state) => state.user;

// AUTH STATUS FLAGS

// 1. Register status flags
export const selectRegisterLoading = createSelector(
  [selectUserReducer],
  (user) => user.loading.register
);
export const selectRegisterSuccess = createSelector(
  [selectUserReducer],
  (user) => user.success.register
);
export const selectRegisterError = createSelector(
  [selectUserReducer],
  (user) => user.error.register
);

// 2. Login status flags
export const selectLoginLoading = createSelector(
  [selectUserReducer],
  (user) => user.loading.login
);
export const selectLoginSuccess = createSelector(
  [selectUserReducer],
  (user) => user.success.login
);
export const selectLoginError = createSelector(
  [selectUserReducer],
  (user) => user.error.login
);

// 3. Logout status flags
export const selectLogoutLoading = createSelector(
  [selectUserReducer],
  (user) => user.loading.logout
);
export const selectLogoutSuccess = createSelector(
  [selectUserReducer],
  (user) => user.success.logout
);
export const selectLogoutError = createSelector(
  [selectUserReducer],
  (user) => user.error.logout
);

// 4. sendVerifyOtp status flags
export const selectSendVerifyOtpLoading = createSelector(
  [selectUserReducer],
  (user) => user.loading.sendVerifyOtp
);
export const selectSendVerifyOtpSuccess = createSelector(
  [selectUserReducer],
  (user) => user.success.sendVerifyOtp
);
export const selectSendVerifyOtpError = createSelector(
  [selectUserReducer],
  (user) => user.error.sendVerifyOtp
);

// 5. verifyUser status flags
export const selectVerifyUserLoading = createSelector(
  [selectUserReducer],
  (user) => user.loading.verifyUser
);
export const selectVerifyUserSuccess = createSelector(
  [selectUserReducer],
  (user) => user.success.verifyUser
);
export const selectVerifyUserError = createSelector(
  [selectUserReducer],
  (user) => user.error.verifyUser
);

// 6. sendResetOtp status flags
export const selectSendResetOtpLoading = createSelector(
  [selectUserReducer],
  (user) => user.loading.sendResetOtp
);
export const selectSendResetOtpSuccess = createSelector(
  [selectUserReducer],
  (user) => user.success.sendResetOtp
);
export const selectSendResetOtpError = createSelector(
  [selectUserReducer],
  (user) => user.error.sendResetOtp
);

// 7. sendResetOtp status flags
export const selectVerifyResetOtpLoading = createSelector(
  [selectUserReducer],
  (user) => user.loading.verifyResetOtp
);
export const selectVerifyResetOtpSuccess = createSelector(
  [selectUserReducer],
  (user) => user.success.verifyResetOtp
);
export const selectVerifyResetOtpError = createSelector(
  [selectUserReducer],
  (user) => user.error.verifyResetOtp
);

// 8. resetPassword status flags
export const selectResetPasswordLoading = createSelector(
  [selectUserReducer],
  (user) => user.loading.resetPassword
);
export const selectResetPasswordSuccess = createSelector(
  [selectUserReducer],
  (user) => user.success.resetPassword
);
export const selectResetPasswordError = createSelector(
  [selectUserReducer],
  (user) => user.error.resetPassword
);

// USER INFO
export const selectIsLoggedIn = createSelector(
  [selectUserReducer],
  (user) => user.isLoggedIn
);

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);

// ERROR MESSAGE
export const selectErrorMessage = createSelector(
  [selectUserReducer],
  (user) => user.errorMessage
);
