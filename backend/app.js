import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
import colors from "colors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
const app = express();
const port = 5000;

dotenv.config();
connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("API is running");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));
