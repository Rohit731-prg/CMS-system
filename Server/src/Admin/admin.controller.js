import cloudinary from "../../config/cloudinary.js";
import Admin from "./admin.model.js";
import bcrypt from "bcryptjs";

export const createAdmin = async (req, res) => {
    const { name, email, password, image, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try {
        const isExist = await Admin.findOne({ email });
        if ( isExist ) return res.status(400).send({ message: "Admin already exist" });
        if ( role != 'admin' && role != 'manager') return res.status(400).send({ message: "Invalid role" });

        let url = '';
        if (image) {
            const image_url = await cloudinary.uploader.upload(image);
            url = image_url.url;
        } else {
            url = 'https://cdn-icons-png.flaticon.com/128/16333/16333743.png';
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ name, email, password: hashedPass, image: url, role });
        await newAdmin.save();

        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logInAdmin = async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password ) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try {
        const admin = await Admin.findOne({ email });
        if ( !admin ) return res.status(404).send({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if ( !isMatch ) return res.status(400).send({ message: "Password is incorrect" });

        res.status(200).json({ user: admin, message: "Admin logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};