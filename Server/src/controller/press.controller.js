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
        const url = image_URL.secure_url;
        const image_ID = image_URL.public_id;

        const newPress = new Press({ company_name, description, image: url, image_ID });
        await newPress.save();

        res.status(201).json({ message: "Press created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllPress = async (req, res) => {
    try {
        const press = await Press.find();
        const count = await Press.countDocuments();
        const limitPress = await Press.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json({ press: press,count: count, limitPress: limitPress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePress = async (req, res) => {
    const { id } = req.params;
    try {
        const press = await Press.findById(id);
        if ( !press ) return res.status(404).send({ message: "Press not found" });

        const result = await cloudinary.uploader.destroy(press.image_ID);
        if ( result.result != "ok" ) return res.status(400).send({ message: "Error deleting image" });

        await Press.findByIdAndDelete(id);
        res.status(200).json({ message: "Press deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePress = async (req, res) => {
    const { id } = req.params;
    const { company_name, description, image } = req.body;
    try {
        const press = await Press.findById(id);
        if ( !press ) return res.status(404).send({ message: "Press not found" });

        const result = await cloudinary.uploader.destroy(press.image_ID);
        if ( result.result != "ok" ) return res.status(400).send({ message: "Error deleting image" });

        const image_URL = await cloudinary.uploader.upload(image);
        const url = image_URL.url;
        const image_ID = image_URL.public_id;

        await Press.findByIdAndUpdate(id, { company_name, description, image: url, image_ID });
        res.status(200).json({ message: "Press updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}