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
//     const body = req?.body;

//     console.log({ body });

//     // if (name == undefined || name == "") {
//     //   return res.send("Data not received :(");
//     // }

//     return res.send( "Data received!!!!!!!!!!!!!!!!!!!!!!");
//   } catch (error) {
//     console.log("error", error);
//     return res.send({ error },"Errorrrrrrr!!");
//   }
// });

// Routes Import
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productsRouter from "./routes/product.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productsRouter);

export default app;
