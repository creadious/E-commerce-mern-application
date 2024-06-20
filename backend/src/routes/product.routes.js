import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  addProduct,
  deleteProduct,
  productDetails,
  viewAllProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/add-product")
  .post(verifyJwt, verifyAdmin, upload.single("productImage"), addProduct);
router.route("/all-products").get(viewAllProduct);
router.route("/product-details").get(productDetails);

router.route("/delete-product").delete(verifyJwt, deleteProduct);

export default router;
