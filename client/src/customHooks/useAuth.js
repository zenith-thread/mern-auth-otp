import { useDispatch, useSelector } from "react-redux";
import {
  registerUserAsync,
  loginUserAsync,
  logOutUserAsync,
  sendVerificationOtpAsync,
} from "../store/user/user.reducer";
import { selectUserReducer } from "../store/user/user.selector";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, status, error, currentUser } =
    useSelector(selectUserReducer);

  const register = (name, email, password) =>
    dispatch(registerUserAsync({ name, email, password }));

  const login = (email, password) =>
    dispatch(loginUserAsync({ email, password }));

  const logout = () => dispatch(logOutUserAsync());

  const sendVerificationOtp = () => dispatch(sendVerificationOtpAsync());

  return {
    isLoggedIn,
    status,
    error,
    currentUser,
    register,
    login,
    logout,
    sendVerificationOtp,
  };
};
