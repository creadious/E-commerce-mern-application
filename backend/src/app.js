import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { FILE_SIZE_LIMIT } from "./constants.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: FILE_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: FILE_SIZE_LIMIT }));
app.use(bodyParser());
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);

export default app;
