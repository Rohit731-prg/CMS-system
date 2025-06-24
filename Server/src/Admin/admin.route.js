import express from "express";
import { createAdmin, logInAdmin } from "./admin.controller.js";
const router = express.Router();

router.post('/createAdmin', createAdmin);
router.post('/login', logInAdmin);

export default router;