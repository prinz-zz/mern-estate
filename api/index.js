import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { dbConnection } from "./dbConnection/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(morgan("common"));

app.use("/api/users", userRoutes);

dbConnection();

app.listen(2222, () => {
  console.log("App listening on port 2222");
});
