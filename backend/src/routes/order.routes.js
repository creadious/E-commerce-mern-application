import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createPaymentIntent,
  paymentComplete,
  viewOrderHistory,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/create-payment-intent").post(verifyJwt, createPaymentIntent);
router.route("/payment").post(verifyJwt, paymentComplete);
router.route("/order-history").get(verifyJwt, viewOrderHistory);

export default router;
