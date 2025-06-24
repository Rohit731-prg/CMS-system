import express from "express";
import {
  createCrew,
  deleteCrew,
  getAllCrew,
} from "../controller/crew.controller.js";

const router = express.Router();

router.post("/createCrew", createCrew);
router.get("/getAllCrew", getAllCrew);
router.delete("/deleteCrew/:id", deleteCrew);

export default router;