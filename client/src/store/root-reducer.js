import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.reducer";
import { resetPasswordReducer } from "./reset-password/resetPassword.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  resetPassword: resetPasswordReducer,
});
