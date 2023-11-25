import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { dbConnection } from "./dbConnection/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from 'cookie-parser';
import path from 'path';

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 
app.use("/api/listing", listingRoutes); 

// app.use("/google");
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


app.use(errorHandler);

dbConnection();

app.listen(2222, () => {
  console.log("App listening on port 2222");
});
