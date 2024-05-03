import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  addCategory,
  deleteCategory,
  updateCategory,
  viewAllCategories,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/categories").post(verifyJwt, verifyAdmin, addCategory);
router.route("/categories").get(viewAllCategories);
router.route("/categories").delete(verifyJwt, verifyAdmin, deleteCategory);
router.route("/categories").put(verifyJwt, verifyAdmin, updateCategory);

export default router;
