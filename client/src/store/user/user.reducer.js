import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Api functions
import {
  registerUserInDatabase,
  loginUserWithEmailAndPassword,
  getUserData,
  logoutUser,
  sendVerificationOtp,
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
        return user;
      }
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
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendVerificationOtpAsync = createAsyncThunk(
  "user/verificationOtp",
  async (_, { rejectWithValue }) => {
    try {
      const { message } = await sendVerificationOtp();
      return message;
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
      })
      // logout user
      .addCase(logOutUserAsync.pending, (state) => {
        state.status = statusTypes.loading;
      })
      .addCase(logOutUserAsync.fulfilled, (state, action) => {
        state.status = statusTypes.succeeded;
        state.currentUser = {};
        state.isLoggedIn = false;
      })
      .addCase(logOutUserAsync.rejected, (state, action) => {
        state.status = statusTypes.failed;
        state.error = action.payload;
      })
      // send verification
      .addCase(sendVerificationOtpAsync.pending, (state) => {
        state.status = statusTypes.loading;
      })
      .addCase(sendVerificationOtpAsync.fulfilled, (state) => {
        state.status = statusTypes.succeeded;
      })
      .addCase(sendVerificationOtpAsync.rejected, (state, action) => {
        state.status = statusTypes.failed;
        state.error = action.payload;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
