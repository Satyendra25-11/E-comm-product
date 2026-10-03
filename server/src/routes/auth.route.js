import { Router } from "express";
import { login, register, refresh, getMe, logout } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/register",registerValidator,register)

router.post("/login",loginValidator,login )

router.post("/refresh-token",refresh)

router.get("/me",authenticate, getMe)

router.post("/logout",authenticate, logout)




export default router