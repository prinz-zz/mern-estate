import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { dbConnection } from "./dbConnection/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

dbConnection();

app.listen(2222, () => {
  console.log("App listening on port 2222");
});
