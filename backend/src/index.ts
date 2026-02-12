import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";

// LOAD ENVIRONMENT VARIABLES FROM .ENV FILE
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// ROUTES
app.use("/api/auth", authRoutes);

// MONGODB CONNECTION
mongoose
  // .connect(process.env.MONGODB_URL as string)
  .connect("mongodb://localhost:27017/lecturer-evaluation-app")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });
