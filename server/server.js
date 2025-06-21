import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

// config
import { connectDB } from "./config/mongodb.js";

// rotues
import authRouter from "./routes/authRoutes/auth.routes.js";
import userRouter from "./routes/userRoutes/user.routes.js";

const PORT = process.env.PORT || 4000;

// Configuration
connectDB();

// Express App
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:4173"];

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => res.json({ message: "API WORKING" }));

// API Endpoints

// auth
app.use("/api/auth", authRouter);

// user
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
