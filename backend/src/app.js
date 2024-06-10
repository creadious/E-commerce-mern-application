import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FILE_SIZE_LIMIT } from "./constants.js";
import multer from "multer";

const upload = multer();
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: FILE_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: FILE_SIZE_LIMIT }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use(upload.array());

// app.post("/check", async (req, res) => {
//   try {
//     const { name } = req?.body;

//     console.log({ name });

//     if (name == undefined || name == "") {
//       return res.send("Data not received :(");
//     }

//     return res.send( "Data received!!!!!!!!!!!!!!!!!!!!!!");
//   } catch (error) {
//     console.log("error", error);
//     return res.send({ error },"Errorrrrrrr!!");
//   }
// });

// Routes Import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);

export default app;
