import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync, loginUserAsync } from "../store/user/user.reducer";
import { selectUserReducer } from "../store/user/user.selector";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, status, error } = useSelector(selectUserReducer);

  const register = (name, email, password) =>
    dispatch(registerUserAsync({ name, email, password }));

  const login = (email, password) =>
    dispatch(loginUserAsync({ email, password }));

  return { isLoggedIn, status, error, register, login };
};
