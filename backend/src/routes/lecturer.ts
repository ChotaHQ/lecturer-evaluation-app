import express from "express";
import { getLecturerData } from "../controllers/lecturerController";

const router = express.Router();

router.get("/", getLecturerData);

export default router;
