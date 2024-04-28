import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post();

export default router;
