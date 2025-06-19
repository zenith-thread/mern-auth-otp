import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Api functions
import {
  registerUserInDatabase,
  loginUserWithEmailAndPassword,
  getUserData,
} from "../../api/auth";

export const statusTypes = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
};

const INITIAL_STATE = {
  isLoggedIn: false,
  currentUser: null,
  status: statusTypes.idle, // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

export const registerUserAsync = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { success } = await registerUserInDatabase(name, email, password);
      if (success) {
        const user = await getUserData();
        console.log("INCOMING USER DATA: ", user);
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
      const { success } = await loginUserWithEmailAndPassword(email, password);
      if (success) {
        const user = await getUserData();
        console.log("INCOMING USER DATA: ", user);
        return user;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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
        state.status = statusTypes.loading;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = statusTypes.succeeded;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = statusTypes.failed;
        state.error = action.payload;
      })
      // login user
      .addCase(loginUserAsync.pending, (state) => {
        state.status = statusTypes.loading;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = statusTypes.succeeded;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = statusTypes.failed;
        state.error = action.payload;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
