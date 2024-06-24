import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  deleteProductInCart,
  quantityDecrease,
  quantityIncrease,
  userCartShow,
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/add-to-cart").post(verifyJwt, addToCart);
router.route("/view").get(verifyJwt,userCartShow);
router.route("/quantity-plus").patch(verifyJwt, quantityIncrease);
router.route("/quantity-minus").patch(verifyJwt, quantityDecrease);
router.route("/cart-delete").patch(verifyJwt, deleteProductInCart);

export default router;
