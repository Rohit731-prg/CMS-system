import cloudinary from "../../config/cloudinary.js";
import Film from "../model/films.model.js";
import fs from "fs";

export const createFilms = async (req, res) => {
  const { name, description, date, location, template } = req.body;
  if (!name || !description || !date || !location || !template) {
    return res.status(400).send({ message: "All fields are required" });
  }
  try {
    const isExist = await Film.findOne({ name });
    if (isExist) return res.status(400).send({ message: "Film already exist" });

    const image_URL = await cloudinary.uploader.upload(template);
    const url = image_URL.secure_url;
    const image_ID = image_URL.public_id;

    const newFilm = new Film({
      name,
      description,
      date,
      location,
      template: url,
      template_ID: image_ID,
    });
    await newFilm.save();
    console.log(newFilm._id, newFilm);
    res
      .status(201)
      .json({ message: "Film created successfully", film: newFilm._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadVideo = async (req, res) => {
  const { id } = req.params;
  console.log("File received:", req.file.path);
  if (!req.file) return res.status(400).send({ message: "Video is required" });
  try {
    const film = await Film.findById(id);
    if (!film) return res.status(404).send({ message: "Film not found" });

    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "videos",
    });
    console.log("Cloudinary upload complete:", result.secure_url);

    fs.unlinkSync(req.file.path);
    console.log("Temporary file deleted.");

    const updateFilm = await Film.findByIdAndUpdate(id, {
      video: {
        url: result.secure_url,
        public_key: result.public_id,
      },
      video_ID: result.public_id,
    });


    if (!updateFilm) {
      console.error("Update failed: no film found to update.");
      return res.status(404).send({ message: "Film not found" });
    }

    res.status(200).json({ message: "Video uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadPhotos = async (req, res) => {
  const { id } = req.params;
  const { photos } = req.body;
  if (!photos) return res.status(400).send({ message: "Photos are required" });
  try {
    const film = await Film.findById(id);
    if (!film) return res.status(404).send({ message: "Film not found" });

    let image_url = "";
    let image_id = "";

    if (Array.isArray(photos)) {
      for (let photo of photos) {
        image_url = await cloudinary.uploader.upload(photo);
        let url = image_url.secure_url;
        image_id = image_url.public_id;

        film.photos.push({ url, public_key: image_id });
      }
    }

    await film.save();
    res.status(200).json({ message: "Photos uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTemplate = async (req, res) => {
  try {
    const films = await Film.find(
      {},
      "name _id template description template_ID"
    );

    res.status(200).json({
      templates: films, // more meaningful than "response"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFilm = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Film.findById(id);
    if (!response) return res.status(404).send({ message: "Film not found" });

    res.status(200).json({ response: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFilm = async (req, res) => {
  const { id } = req.params;
  try {
    const film = await Film.findById(id);
    if (!film) return res.status(404).send({ message: "Film not found" });

    const result = await cloudinary.uploader.destroy(film.template_ID);
    if (result.result != "ok") return res.status(400).send({ message: "Error deleting template" });

    const resultVideo = await cloudinary.uploader.destroy(film.video_ID, {
      resource_type: "video",
    });

    if (resultVideo.result != "ok")
      return res.status(400).send({ message: "Error deleting video" });
    if (Array.isArray(film.photos)) {
      for (let photo of film.photos) {
        const result = await cloudinary.uploader.destroy(photo.public_key);
      }
    }

    await Film.findByIdAndDelete(id);
    res.status(200).json({ message: "Film deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editFilmDetails = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, location } = req.body;
  if (!name || !description || !date || !location)
    return res.status(400).send({ message: "All fields are required" });

  try {
    const film = await Film.findById(id);
    if (!film) return res.status(404).send({ message: "Film not found" });

    await Film.findByIdAndUpdate(id, {
      name,
      description,
      date,
      location,
    });
    res.status(200).json({ message: "Film updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatetemplate = async (req, res) => {
  const { id } = req.params;
  const { template } = req.body;
  if (!template)
    return res.status(400).send({ message: "Template is required" });

  try {
    const film = await Film.findById(id);
    if (!film) return res.status(404).send({ message: "Film not found" });

    const deleteImage = await cloudinary.uploader.destroy(film.template_ID);
    if (deleteImage.result !== "ok")
      return res.status(400).send({ message: "Error deleting old template" });

    const image_URL = await cloudinary.uploader.upload(template);
    const url = image_URL.secure_url;
    const image_ID = image_URL.public_id;

    await Film.findByIdAndUpdate(id, {
      template: url,
      template_ID: image_ID,
    });

    res.status(200).json({ message: "Template updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const video = req.file;

  if (!video) return res.status(400).send({ message: "Video is required" });

  try {
    const film = await Film.findById(id);
    if (!film) return res.status(404).send({ message: "Film not found" });

    const result = await cloudinary.uploader.upload(video.path, {
      resource_type: "video",
      folder: "videos",
    });

    await Film.findByIdAndUpdate(id, {
      video: {
        url: result.secure_url,
        public_key: result.public_id,
      },
      video_ID: result.public_id, // Optional
    });

    res.status(200).json({ message: "Video updated successfully" });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
};
