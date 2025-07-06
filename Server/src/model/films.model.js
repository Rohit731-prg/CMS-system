import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema({
    url: { type: String, required: true },
    public_key: { type: String, default: '' },
});

const filmSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    template: { type: String, required: true },
    template_ID: { type: String, default: '' },
    video: { type: mediaSchema, default: null },
    video_ID: { type: String, default: '' },

    photos: { type: [mediaSchema] },
});

const Film = mongoose.model("Film", filmSchema);

export default Film;