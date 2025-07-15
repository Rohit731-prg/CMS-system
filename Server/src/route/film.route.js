import express from "express";
import {
  createFilms,
  deleteFilm,
  editFilmDetails,
  getAllTemplate,
  getFilm,
  updatePhotos,
  updatetemplate,
  updateVideo,
  uploadPhotos,
  uploadVideo,
} from "../controller/films.controller.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

router.post("/createFilm", createFilms);
router.put("/uploadVideo/:id/video", upload.single("video"), uploadVideo);
router.put('/uploadImages/:id', uploadPhotos);
router.get("/getAllFilms", getAllTemplate);
router.post("/getFilm/:id", getFilm);
router.delete('/filmDelete/:id', deleteFilm);
router.put('/updateFilmDetails/:id', editFilmDetails);
router.put('/updateTemplate/:id', updatetemplate);
router.put('/updateVideo/:id/video', upload.single("video"), updateVideo);
router.put('/updatePhotos/:id', updatePhotos);

export default router;