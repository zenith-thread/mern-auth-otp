import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // enables sending & recieving back cookies
});

export const registerUserInDatabase = async (name, email, password) => {
  const { data } = await api.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

export const loginUserWithEmailAndPassword = async (email, password) => {
  const { data } = await api.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

export const getUserData = async () => {
  const { data } = await api.get("/api/user/data");
  return data.userData;
};

export const logoutUser = async () => {
  const { data } = await api.post("/api/auth/logout", {});
  return data;
};

export const sendVerificationOtp = async () => {
  const { data } = await api.post("/api/auth/send-verification-otp", {});
  return data;
};

export const verifyUser = async (otp) => {
  console.log("Recieved otp in this format: ", otp);
  const { data } = await api.post("/api/auth/verify-user", { otp });
  return data;
};

export const sendResetPasswordOtp = async (email) => {
  const { data } = await api.post("/api/auth/send-reset-otp", { email });
  return data;
};

export const verifyResetOtp = async (email, otp) => {
  const { data } = await api.post("/api/auth/verify-reset-otp", { email, otp });
  return data;
};

export const resetPassword = async (email, newPassword, otp) => {
  console.log("AM I SENDING PROPER DATA?: ", email, newPassword, otp);
  const { data } = await api.post("/api/auth/reset-password", {
    email,
    newPassword,
    otp,
  });
  return data;
};
