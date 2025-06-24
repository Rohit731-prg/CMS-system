import cloudinary from "../../config/cloudinary.js";
import Crew from "../model/crew.model.js";

export const createCrew = async (req, res) => {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try {
        const isExist = await Crew.findOne({ name });
        if (isExist) return res.status(400).send({ message: "Crew already exist" });
        
        const image_URL = await cloudinary.uploader.upload(image);
        const url = image_URL.url;
        
        const newCrew = new Crew({ name, description, image: url });
        await newCrew.save();
        
        res.status(201).json({ message: "Crew created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllCrew = async (req, res) => {
    try {
        const crew = await Crew.find();
        res.status(200).json(crew);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const  deleteCrew = async (req, res) => {
    const { id } = req.params;
    try {
        const crew = await Crew.findById(id);
        if ( !crew ) return res.status(404).send({ message: "Crew not found" });
        
        await Crew.findByIdAndDelete(id);
        res.status(200).json({ message: "Crew deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}