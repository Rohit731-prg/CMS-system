import express from "express";
import { createPress, deletePress, getAllPress, updatePress } from "../controller/press.controller.js";

const router = express.Router();

router.post('/createPress', createPress);
router.get('/getAllPress', getAllPress);
router.delete('/deletePress/:id', deletePress);
router.put('/updatePress/:id', updatePress);

export default router;