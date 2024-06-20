import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addAddress,
  deleteAddress,
  updateAddress,
  viewUserAddresses,
} from "../controllers/address.controller.js";

const router = Router();

router.route("/add-address").post(verifyJwt, addAddress);
router.route("/view-address").get(verifyJwt, viewUserAddresses);
router.route("/update-address").put(verifyJwt, updateAddress);
router.route("/delete-address/:id").delete(verifyJwt, deleteAddress);

export default router;
