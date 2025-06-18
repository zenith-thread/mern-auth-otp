import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

// config
import { connectDB } from "./config/mongodb.js";

// rotues
import authRouter from "./routes/authRoutes/auth.routes.js";

const PORT = process.env.PORT || 4000;

// Configuration
connectDB();

// Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.get("/", (req, res) => res.json({ message: "API WORKING" }));

// API Endpoints
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
