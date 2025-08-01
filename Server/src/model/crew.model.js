import mongoose, { Schema } from "mongoose";

const crewSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    image_ID: { type: String, default: '' },
});

const Crew = mongoose.model("Crew", crewSchema);

export default Crew;