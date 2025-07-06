import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({
    name: { type: String, required: true },
    star: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    image_ID: { type: String, default: '' },
}, {
    timestamps: true
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;