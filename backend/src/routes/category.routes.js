import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  addCategory,
  addSubcategory,
  viewAllCategories,
  deleteCategory,
  deleteSubcategory,
  updateCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.post("/add-category", verifyJwt, addCategory);
router.post("/add-subcategory", verifyJwt, addSubcategory);
router.get("/view-categories", verifyJwt, viewAllCategories);
router.delete("/delete-category", verifyJwt, deleteCategory);
router.delete("/delete-subcategory", verifyJwt, deleteSubcategory);
router.put("/update-category", verifyJwt, updateCategory);

export default router;
