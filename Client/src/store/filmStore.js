import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../Utils/axios"; // Your custom axios instance

const useFilmStore = create((set, get) => ({
  // Initial state
  film: null,
  count: 0,
  createFilmID: null,

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

      console.log("Film created:", res.data.film); // Debug: check what backend returns

      if (!res.data.film) {
        toast.error("No film ID returned from server.");
        return false;
      }

      // Update Zustand state
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

    const res = axios.put(`/film/uploadImages/${filmID}`, {
      photos: images,
    });

    return toast.promise(res, {
      loading: "Uploading images...",
      success: (res) => res.data.message || "Images uploaded successfully",
      error: (err) => err?.response?.data?.message || "Error uploading images",
    });
  },

  getFilmByID: async (id) => {
    try {
      const res = await axios.post(`/film/getFilm/${id}`);
      return res.data.response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch film");
    }
  },

  uploadVideo: async (video) => {
    const filmID = get().createFilmID;
    const res = axios.put(`/film/uploadVideo/${filmID}`, {
      video: video,
    });

    return toast.promise(res, {
      loading: "Uploading video...",
      success: (res) => res.data.message || "Video uploaded successfully",
      error: (err) => err?.response?.data?.message || "Error uploading video",
    });
  },

  deleteFilm: async (id) => {
    const res = axios.delete(`/film/filmDelete/${id}`);

    return toast.promise(res, {
      loading: "Deleting film...",
      success: (res) => res.data.message || "Film deleted successfully",
      error: (err) => err?.response?.data?.message || "Error deleting film",
    });
  }
}));

export default useFilmStore;
