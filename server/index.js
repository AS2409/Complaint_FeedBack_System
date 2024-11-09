// server/index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.js";
import complaintRoutes from "./routes/complaints.js";
import adminComplaintRoutes from "./routes/admincomplaint.js"; // Make sure this is the correct path

dotenv.config();
const PORT = 8093;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// Connect to the `hostelmanagement` database
mongoose
  .connect("mongodb+srv://aditisonkar2409:1234@cluster4.due5n.mongodb.net/")
  .then(() => console.log("Connected to hostelmanagement database"))
  .catch((error) => console.error("Database connection error:", error));

// Set up routes
app.use("/auth", UserRouter);
app.use("/api", complaintRoutes);
// app.use("/api/complaints", complaintRoutes);
app.use("/admincomplaint", adminComplaintRoutes); // Admin-specific complaint routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
