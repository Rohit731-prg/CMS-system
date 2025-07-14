import cloudinary from "../../config/cloudinary.js";
import Blog from "../model/blogs.model.js";

export const createBlogs = async (req, res) => {
    const { name, description, link, image } = req.body;
    if (!name || !description || !link || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try {
        const isExist = await Blog.findOne({ name, description });
        if ( isExist ) return res.status(400).send({ message: "Blog already exist" });

        const image_URL = await cloudinary.uploader.upload(image);
        const url = image_URL.url;
        const image_ID = image_URL.public_id;

        const newBlog = new Blog({ name, description, link, image: url, image_ID });
        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        const limitBlog = await Blog.find().limit(5);
        const count = await Blog.countDocuments();
        res.status(200).json({ blogs: blogs,count: count, limitBlog: limitBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if ( !blog ) return res.status(404).send({ message: "Blog not found" });

        const result = await cloudinary.uploader.destroy(blog.image_ID);
        if ( result.result != "ok" ) return res.status(400).send({ message: "Error deleting image" });

        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editBlog = async (req, res) => {
    const { id } = req.params;
    const { name, description, link, image } = req.body;
    try {
        const blog = await Blog.findById(id);
        res.status(400).json({ message: "Blog not found"});

        const result = await cloudinary.uploader.destroy(blog.image_ID);
        if ( result.result != "ok" ) return res.status(400).send({ message: "Error deleting image" });

        const image_URL = await cloudinary.uploader.upload(image);
        const url = image_URL.url;
        const image_ID = image_URL.public_id;

        await Blog.findByIdAndUpdate(id, { name, description, link, image: url, image_ID });
        res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}