import express from "express";
import {
  getEvaluationData,
  postEvaluationData,
} from "../controllers/evaluateController";

const router = express.Router();

router.get("/", getEvaluationData);
router.post("/", postEvaluationData);

export default router;
