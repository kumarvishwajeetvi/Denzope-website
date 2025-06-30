import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import phonepeRoutes from "./routes/phonepe.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/phonepe", phonepeRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo connected"))
  .catch(console.error);

app.use(express.static("../client/dist")); // serve built React

app.listen(process.env.PORT, () =>
  console.log("Server on http://localhost:" + process.env.PORT),
);
