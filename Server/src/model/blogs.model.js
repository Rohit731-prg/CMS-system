import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    image_ID: { type: String, default: '' },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;