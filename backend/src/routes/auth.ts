import express from "express";
import {
  checkAuth,
  registerAdmins,
  login,
  verify,
  createPassword,
  logout,
} from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/checkAuth", verifyToken, checkAuth);
router.post("/register", registerAdmins);
router.post("/verify", verify);
router.post("/login", login);
router.put("/create-password", createPassword);
router.post("/logout", logout);

export default router;
