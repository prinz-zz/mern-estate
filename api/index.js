import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import { dbConnection } from "./dbConnection/dbConnection.js";

const app = express();

dbConnection();

app.listen(2222, () => {
  console.log("App listening on port 2222");
});
