import express from "express";
import authController from "../controllers/auth.controllers.js";

const router = express.Router();
router.post("/register", authController.signup);

router.get("/verify-email/:token", authController.verificationEmail);

router.post("/signin", authController.signin);

export default router;
