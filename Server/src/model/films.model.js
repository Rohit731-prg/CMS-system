import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema({
    url: { type: String, required: true },
    public_key: { type: String, required: true },
});

const filmSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    template: { type: String, required: true },
    template_ID: { type: String, default: '' },
    video: { type: mediaSchema, required: true },
    video_ID: { type: String, default: '' },

    photos: { type: [mediaSchema], required: true },
});

const Film = mongoose.model("Film", filmSchema);

export default Film;