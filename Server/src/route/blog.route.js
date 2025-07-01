import express from "express";
import {
  createBlogs,
  deleteBlog,
  editBlog,
  getAllBlogs,
} from "../controller/blogs.controller.js";

const router = express.Router();

router.post("/createPost", createBlogs);
router.get("/getAllBlogs", getAllBlogs);
router.delete("/deleteBlog/:id", deleteBlog);
router.put("/updateBlog/:id", editBlog);

export default router;
