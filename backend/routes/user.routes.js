import express from "express";
import { register, login, logout, updateProfile, viewResume } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/update-profile", isAuthenticated, updateProfile);
router.get("/view-resume", isAuthenticated, viewResume);

export default router; 