import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;