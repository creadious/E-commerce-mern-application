import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createPaymentIntent,
  paymentComplete,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/create-payment-intent").post(createPaymentIntent);
router.route("/payment").post(verifyJwt, paymentComplete);

export default router;
