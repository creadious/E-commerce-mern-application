import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createPaymentIntent } from "../controllers/order.controller.js";

const router = Router();

router.route("/create-payment-intent").post(createPaymentIntent);

export default router;
