import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../Utils/axios"; // Your custom axios instance

const useFilmStore = create((set, get) => ({
  // Initial state
  film: null,
  count: 0,
  createFilmID: null,
  singelFilm: null,

  // Create a new film
  setFilms: async (film) => {
    try {
      const res = await toast.promise(
        axios.post("/film/createFilm", film),
        {
          loading: "Creating film...",
          success: (res) => res.data.message || "Film created successfully",
          error: (err) => err?.response?.data?.message || "Error creating film",
        }
      );

      if (!res.data.film) {
        toast.error("No film ID returned from server.");
        return false;
      }

      set({ createFilmID: res.data.film });
      return true;
    } catch (err) {
      console.error("Film creation failed:", err);
      return false;
    }
  },

  // Get all films
  getFilms: async () => {
    try {
      const res = await axios.get("/film/getAllFilms");
      set({
        film: res.data.templates,
        count: res.data.count,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch films");
    }
  },

  // Upload images to created film
  setImages: async (images) => {
    const filmID = get().createFilmID;

    if (!filmID) {
      toast.error("No film ID found. Please create a film first.");
      return;
    }

    try {
      const res = await toast.promise(
        axios.put(`/film/uploadImages/${filmID}`, { photos: images }),
        {
          loading: "Uploading images...",
          success: (res) => res.data.message || "Images uploaded successfully",
          error: (err) => err?.response?.data?.message || "Error uploading images",
        }
      );

      // ✅ Refresh films after upload
      await get().getFilms();
      return res;
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  },

  getFilmByID: async (id) => {
    try {
      const res = await axios.post(`/film/getFilm/${id}`);
      console.log("Film fetched successfully");
      set({ singelFilm: res.data.response });
      return res.data.response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch film");
    }
  },

  // ✅ Upload video with toast.promise
  uploadVideo: async (video) => {
    const filmID = get().createFilmID;
    if (!filmID) {
      toast.error("Film ID is missing.");
      return false;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      const res = await toast.promise(
        axios.put(`/film/uploadVideo/${filmID}/video`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Uploading video...",
          success: (res) => res.data.message || "Video uploaded successfully",
          error: (err) => err?.response?.data?.message || "Failed to upload video",
        }
      );

      return true;
    } catch (error) {
      console.error("Video upload failed:", error);
      return false;
    }
  },

  deleteFilm: async (id) => {
    const res = axios.delete(`/film/filmDelete/${id}`);

    return toast.promise(res, {
      loading: "Deleting film...",
      success: (res) => res.data.message || "Film deleted successfully",
      error: (err) => err?.response?.data?.message || "Error deleting film",
    });
  },

  updateBasicDetails: async (id, details) => {
    try {
      const response = await toast.promise(
        axios.put(`/film/updateFilmDetails/${id}`, details),
        {
          loading: "Updating film details...",
          success: (res) =>
            res.data?.message || "Film details updated successfully",
          error: (err) =>
            err?.response?.data?.message || "Error updating film details",
        }
      );

      // Refresh films after update
      await get().getFilmByID(id);

      // Optionally return updated details
      return response?.data;
    } catch (error) {
      console.error("Update failed:", error);
      return null;
    }
  },

  updateTemplate: async (id, template) => {
    try {
      const res = await toast.promise(
        axios.put(`/film/updateTemplate/${id}`, {
          template,
        }),
        {
          loading: "Updating film template...",
          success: (res) =>
            res.data?.message || "Film template updated successfully",
          error: (err) =>
            err?.response?.data?.message || "Error updating film template",
        }
      );

      await get().getFilmByID(id);
      return res;
    } catch (error) {
      console.error("Update failed:", error);
      return null;
    }
  },

  updateVideo: async (id, video) => {
    try {
      console.log(video);
      const formData = new FormData();
      formData.append("video", video);
      console.log(formData);
      const res = await toast.promise(
        axios.put(`/film/updateVideo/${id}/video`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Uploading video...",
          success: (res) => res.data.message || "Video uploaded successfully",
          error: (err) => err?.response?.data?.message || "Failed to upload video",
        }
      );

      await get().getFilmByID(id);
      return res;
    } catch (error) {
      console.error("Video update failed:", error);
      return null;
    }
  },

  updatePhotos: async (id, images) => {
    try {
      const res = await toast.promise(
        axios.put(`/film/updatePhotos/${id}`, { photos: images }),
        {
          loading: "Updating photos...",
          success: (res) => res.data.message || "Photos updated successfully",
        }
      );

      await get().getFilmByID(id);
      return res;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update photos");
      console.error("Photo update failed:", error);
    }
  }

}));

export default useFilmStore;
