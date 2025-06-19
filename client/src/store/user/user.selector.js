export const selectUserReducer = (state) => state.user;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectCurrentUser = (state) => state.user.currentUser;
