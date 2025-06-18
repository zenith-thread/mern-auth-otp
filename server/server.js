import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/mongodb.js";

const PORT = process.env.PORT || 4000;

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
