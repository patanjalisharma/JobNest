import express from "express"
import { register, login, logout, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleFileUpload } from "../middlewares/multer.js"

const router = express.Router()

router.route("/register").post(singleFileUpload ,register)
router.route("/login").post(login)
router.route("/profile-update").post(isAuthenticated,singleFileUpload, updateProfile)
router.route("/logout").get(logout)

export default router
