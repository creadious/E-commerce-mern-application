import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { addProduct, deleteProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/add-product")
  .post(verifyJwt, upload.single("productImage"), addProduct);

  router.route("/delete-product").delete(verifyJwt, deleteProduct)

// router.route("/add-product").post(async (req, res) => {
//   const body = req.body;
//   console.log({ body });
//   res.send({ body });
// });

export default router;
