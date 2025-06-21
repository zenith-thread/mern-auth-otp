import { useDispatch, useSelector } from "react-redux";
import {
  registerUserAsync,
  loginUserAsync,
  logOutUserAsync,
  sendVerificationOtpAsync,
  verifyUserAsync,
  sendResetPasswordOtpAsync,
  verifyResetOtpAsync,
  resetPasswordAsync,
} from "../store/user/user.asyncThunks";
import {
  selectCurrentUser,
  selectIsLoggedIn,

  // Register
  selectRegisterLoading,
  selectRegisterSuccess,
  selectRegisterError,

  // Login
  selectLoginLoading,
  selectLoginSuccess,
  selectLoginError,

  // Logout
  selectLogoutLoading,
  selectLogoutSuccess,
  selectLogoutError,

  // Send Verification Otp
  selectSendVerifyOtpLoading,
  selectSendVerifyOtpSuccess,
  selectSendVerifyOtpError,

  // Verify User
  selectVerifyUserLoading,
  selectVerifyUserSuccess,
  selectVerifyUserError,

  // Send Reset Otp
  selectSendResetOtpLoading,
  selectSendResetOtpSuccess,
  selectSendResetOtpError,
  // Verify Reset Otp
  selectVerifyResetOtpLoading,
  selectVerifyResetOtpSuccess,
  selectVerifyResetOtpError,

  // Reset Password
  selectResetPasswordLoading,
  selectResetPasswordSuccess,
  selectResetPasswordError,

  // Error Message
  selectErrorMessage,
} from "../store/user/user.selector";
import { unwrapResult } from "@reduxjs/toolkit";

export const useAuth = () => {
  const dispatch = useDispatch();

  // SELECTORS
  // user info
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);

  // AUTH FLAGS

  // 1. Register Flags
  const registerLoading = useSelector(selectRegisterLoading);
  const registerSuccess = useSelector(selectRegisterSuccess);
  const registerError = useSelector(selectRegisterError);

  // 2. Login Flags
  const loginLoading = useSelector(selectLoginLoading);
  const loginSuccess = useSelector(selectLoginSuccess);
  const loginError = useSelector(selectLoginError);

  // 3. Login Flags
  const logoutLoading = useSelector(selectLogoutLoading);
  const logoutSuccess = useSelector(selectLogoutSuccess);
  const logoutError = useSelector(selectLogoutError);

  // 4. Verification Otp Flags
  const sendVerifyOtpLoading = useSelector(selectSendVerifyOtpLoading);
  const sendVerifyOtpSuccess = useSelector(selectSendVerifyOtpSuccess);
  const sendVerifyOtpError = useSelector(selectSendVerifyOtpError);

  // 5. Verify User Flags
  const verifyUserLoading = useSelector(selectVerifyUserLoading);
  const verifyUserSuccess = useSelector(selectVerifyUserSuccess);
  const verifyUserError = useSelector(selectVerifyUserError);

  // 6. Reset Otp Flags
  const sendResetOtpLoading = useSelector(selectSendResetOtpLoading);
  const sendResetOtpSuccess = useSelector(selectSendResetOtpSuccess);
  const sendResetOtpError = useSelector(selectSendResetOtpError);

  // 7. Reset Otp Flags
  const verifyResetOtpLoading = useSelector(selectVerifyResetOtpLoading);
  const verifyResetOtpSuccess = useSelector(selectVerifyResetOtpSuccess);
  const verifyResetOtpError = useSelector(selectVerifyResetOtpError);

  // 8. Reset Password Flags
  const resetPasswordLoading = useSelector(selectResetPasswordLoading);
  const resetPasswordSuccess = useSelector(selectResetPasswordSuccess);
  const resetPasswordError = useSelector(selectResetPasswordError);

  // ERROR MESSAGE
  const errMessage = useSelector(selectErrorMessage);

  // DISPATCH ASYNC THUNKS
  const register = (name, email, password) =>
    dispatch(registerUserAsync({ name, email, password })).then(unwrapResult);

  const login = (email, password) =>
    dispatch(loginUserAsync({ email, password })).then(unwrapResult);

  const logout = () => dispatch(logOutUserAsync()).then(unwrapResult);

  const sendVerificationOtp = () =>
    dispatch(sendVerificationOtpAsync()).then(unwrapResult);

  const verifyUser = (otp) =>
    dispatch(verifyUserAsync({ otp })).then(unwrapResult);

  const sendResetPasswordOtp = (email) =>
    dispatch(sendResetPasswordOtpAsync({ email })).then(unwrapResult);

  const verifyResetOtp = (email, otp) =>
    dispatch(verifyResetOtpAsync({ email, otp })).then(unwrapResult);

  const resetPassword = (email, newPassword, otp) =>
    dispatch(resetPasswordAsync({ email, newPassword, otp })).then(
      unwrapResult
    );

  return {
    // User Info
    isLoggedIn,
    currentUser,

    // Functions
    register,
    login,
    logout,
    sendVerificationOtp,
    verifyUser,
    sendResetPasswordOtp,
    verifyResetOtp,
    resetPassword,

    // Auth flags

    // register
    registerLoading,
    registerSuccess,
    registerError,

    // login
    loginLoading,
    loginError,
    loginSuccess,

    // logout
    logoutLoading,
    logoutError,
    logoutSuccess,

    // send verification otp
    sendVerifyOtpLoading,
    sendVerifyOtpSuccess,
    sendVerifyOtpError,

    // verify user
    verifyUserLoading,
    verifyUserSuccess,
    verifyUserError,

    // send reset otp
    sendResetOtpLoading,
    sendResetOtpSuccess,
    sendResetOtpError,

    // verify reset otp
    verifyResetOtpLoading,
    verifyResetOtpSuccess,
    verifyResetOtpError,

    // reset password
    resetPasswordLoading,
    resetPasswordSuccess,
    resetPasswordError,

    // Error Message
    errMessage,
  };
};
