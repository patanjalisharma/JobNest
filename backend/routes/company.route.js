import express from "express"
import { registerCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleFileUpload } from "../middlewares/multer.js"

const router = express.Router()

router.route("/register").post(isAuthenticated,singleFileUpload, registerCompany)
router.route("/get").get(isAuthenticated,getCompany)
router.route("/:id").get(isAuthenticated, getCompanyById)
router.route("/update/:id").put(isAuthenticated,singleFileUpload,updateCompany)

export default router