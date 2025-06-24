import mongoose, { Schema } from "mongoose";

const adminShema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminShema);

export default Admin;