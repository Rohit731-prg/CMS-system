import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedBack,
  updateFeedback,
} from "../controller/feedback.controller.js";

const router = express.Router();

router.post("/createFeedback", createFeedback);
router.get("/getAllFeedback", getAllFeedBack);
router.put("/updateFeedback/:id", updateFeedback);
router.delete("/deleteFeedback/:id", deleteFeedback);

export default router;