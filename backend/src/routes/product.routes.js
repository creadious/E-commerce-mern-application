import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { addProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/product").post(verifyJwt, verifyAdmin, addProduct);

export default router;
