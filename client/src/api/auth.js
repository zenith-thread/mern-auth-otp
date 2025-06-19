import axios from "axios";

console.log("ENV BACKEND URL: ", import.meta.env.VITE_BACKEND_URL);

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
  const { data } = await api.post("/api/auth/send-verification-otp");
  return data;
};
