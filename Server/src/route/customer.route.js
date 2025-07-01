import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  updateCustomer,
} from "../controller/customer.controller.js";

const router = express.Router();

router.post("/createCustomer", createCustomer);
router.get("/getAllCustomer", getAllCustomer);
router.delete("/deleteCustomer/:id", deleteCustomer);
router.put("/updateCustomer/:id", updateCustomer);

export default router;
