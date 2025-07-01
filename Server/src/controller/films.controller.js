import cloudinary from "../../config/cloudinary.js";
import Film from "../model/films.model.js";
import fs from "fs";

export const createFilms = async (req, res) => {
  const { name, description, date, location, template, photos } = req.body;
  const video = req.file?.path;

  if (!name || !description || !date || !location || !template || !photos) {
    return res.status(400).send({ message: "All fields are required" });
  }

  if (!video) {
    return res.status(400).send({ message: "Video is required" });
  }

  try {
    const isExist = await Film.findOne({ name });
    if (isExist) {
      return res.status(400).send({ message: "Film already exists" });
    }

    // Upload template image
    const templateUpload = await cloudinary.uploader.upload(template);
    const template_URL = templateUpload.url;
    const template_ID = templateUpload.public_id;

    // Upload video
    const videoUpload = await cloudinary.uploader.upload(video, {
      resource_type: "video",
      folder: "films",
    });
    const video_URL = videoUpload.url;
    const video_ID = videoUpload.public_id;

    // Delete video from local storage
    fs.unlinkSync(video);

    // Upload photos in parallel
    const photosArray = Array.isArray(photos) ? photos : [photos];
    const photoUploads = await Promise.all(
      photosArray.map((photo) =>
        cloudinary.uploader.upload(photo).then((res) => ({
          url: res.url,
          public_key: res.public_id,
        }))
      )
    );

    // Create and save film
    const newFilm = new Film({
      name,
      description,
      date,
      location,
      template: template_URL,
      template_ID,
      video: video_URL,
      video_ID,
      photos: photoUploads,
    });

    await newFilm.save();
    res.status(201).json({ message: "Film created successfully" });
  } catch (error) {
    console.error("Error creating film:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllFilms = async (req, res) => {
  try {
    const films = await Film.find();
    const count = await Film.countDocuments();
    res.status(200).json({ films: films, count: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};