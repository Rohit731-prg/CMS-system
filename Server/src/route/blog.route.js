import express from "express";
import { createBlogs, deleteBlog, getAllBlogs } from "../controller/blogs.controller.js";

const router = express.Router();

router.post('/createPost', createBlogs);
router.get('/getAllBlogs', getAllBlogs);
router.delete('/deleteBlog/:id', deleteBlog);

export default router;