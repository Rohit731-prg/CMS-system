import cloudinary from "../../config/cloudinary.js";
import Press from "../model/press.model.js";

export const createPress = async (req, res) => {
    const { company_name, description, image } = req.body;
    if (!company_name || !description || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try {
        const isExist = await Press.findOne({ company_name, description });
        if ( isExist ) return res.status(400).send({ message: "Press already exist" });

        const image_URL = await cloudinary.uploader.upload(image);
        const url = image_URL.url;

        const newPress = new Press({ company_name, description, image: url });
        await newPress.save();

        res.status(201).json({ message: "Press created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllPress = async (req, res) => {
    try {
        const press = await Press.find();
        res.status(200).json(press);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePress = async (req, res) => {
    const { id } = req.params;
    try {
        const press = await Press.findById(id);
        if ( !press ) return res.status(404).send({ message: "Press not found" });

        await Press.findByIdAndDelete(id);
        res.status(200).json({ message: "Press deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}