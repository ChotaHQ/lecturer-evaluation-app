import express from "express";
import {
  registerAdmins,
  login,
  verify,
  createPassword,
  logout,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerAdmins);
router.post("/verify", verify);
router.post("/login", login);
router.put("/create-password", createPassword);
router.post("/logout", logout);

export default router;
