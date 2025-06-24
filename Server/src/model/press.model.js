import mongoose, { Schema } from "mongoose";

const pressSchema = new Schema({
    company_name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});

const Press = mongoose.model("Press", pressSchema);

export default Press;