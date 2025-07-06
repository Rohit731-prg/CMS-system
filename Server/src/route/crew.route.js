import express from "express";
import {
  createCrew,
  deleteCrew,
  getAllCrew,
  updateCrew,
} from "../controller/crew.controller.js";
import { getFilm } from "../controller/films.controller.js";

const router = express.Router();

router.post("/createCrew", createCrew);
router.get("/getAllCrew", getAllCrew);
router.put("/updateCrew/:id", updateCrew);
router.delete("/deleteCrew/:id", deleteCrew);

export default router;