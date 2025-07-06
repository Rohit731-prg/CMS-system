import cloudinary from "../../config/cloudinary.js";
import Feedback from "../model/feedback.model.js";

export const createFeedback = async (req, res) => {
    const { name, star, description, image } = req.body;
    if (!name || !star || !description || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }
    if ( star > 5 || star < 1 ) {
        return res.status(400).send({ message: "Star must be between 1 and 5" });
    }
    try {
        const isExist = await Feedback.findOne({ name });
        if (isExist) return res.status(400).send({ message: "Feedback already exist" });
        const image_URL = await cloudinary.uploader.upload(image);
        const url = image_URL.url;
        const image_ID = image_URL.public_id;
        const newFeedback = new Feedback({ name, star, description, image: url, image_ID });
        await newFeedback.save();
        res.status(201).json({ message: "Feedback created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllFeedBack = async (req, res) => {
    try {
        const feedback = await Feedback.find({}).sort({ createdAt: -1 });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const { name, star, description, image } = req.body;
    if (!name || !star || !description || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }
    if (star > 5 || star < 1) {
        return res.status(400).send({ message: "Star must be between 1 and 5" });
    }
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) return res.status(404).send({ message: "Feedback not found" });
        const result = await cloudinary.uploader.destroy(feedback.image_ID);
        if (result.result != "ok") return res.status(400).send({ message: "Error deleting image" });
        const image_URL = await cloudinary.uploader.upload(image);
        const url = image_URL.url;
        const image_ID = image_URL.public_id;
        await Feedback.findByIdAndUpdate(id, { name, star, description, image: url, image_ID });
        res.status(200).json({ message: "Feedback updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) return res.status(404).send({ message: "Feedback not found" });

        const result = await cloudinary.uploader.destroy(feedback.image_ID);
        if (result.result != "ok") return res.status(400).send({ message: "Error deleting image" });
        await Feedback.findByIdAndDelete(id);
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}