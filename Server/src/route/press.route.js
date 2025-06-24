import express from "express";
import { createPress, deletePress, getAllPress } from "../controller/press.controller.js";

const router = express.Router();

router.post('/createPress', createPress);
router.get('/getAllPress', getAllPress);
router.delete('/deletePress/:id', deletePress);

export default router;