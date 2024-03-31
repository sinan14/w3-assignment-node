import express from "express";
import {
  getRegister,
  addUser,
  getLogin,
  loginUser,
  getRecruiterLandingPage,
  logout,
} from "./user.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import {
  validateLogin,
  validateRegister,
} from "../../middlewares/loginValidator.js";
const router = express.Router();

router.get("/register", getRegister);
router.post("/register", validateRegister, addUser);
router.get("/login", getLogin);
router.post("/login", validateLogin, loginUser);
router.use(auth);
router.get("/logout", logout);
router.get("/recruiter", getRecruiterLandingPage);

export default router;
