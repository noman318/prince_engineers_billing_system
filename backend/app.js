import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectToDb from "./config/db.js";
import colors from "colors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import clientRoutes from "./routes/client.route.js";
import billRoutes from "./routes/bill.route.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
const app = express();
const port = 5000;

dotenv.config();
connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json("API is running");
// });

app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/bills", billRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  // console.log("__dirname", __dirname);
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));
