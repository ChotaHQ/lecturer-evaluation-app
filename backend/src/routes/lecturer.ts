import express from "express";
import {
  getLecturerData,
  getAllLecturers,
} from "../controllers/lecturerController";

const router = express.Router();

router.get("/", getLecturerData);
router.get("/all", getAllLecturers);

export default router;
