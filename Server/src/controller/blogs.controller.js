import cloudinary from "../../config/cloudinary.js";
import Blog from "../model/blogs.model.js";

export const createBlogs = async (req, res) => {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try {
        const isExist = await Blog.findOne({ name, description });
        if ( isExist ) return res.status(400).send({ message: "Blog already exist" });

        const image_URL = await cloudinary.uploader.upload(image);
        const url = image_URL.url;

        const newBlog = new Blog({ name, description, image: url });
        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if ( !blog ) return res.status(404).send({ message: "Blog not found" });

        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}