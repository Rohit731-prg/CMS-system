import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../Utils/axios";

const useFeedbackStore = create((set, get) => ({
  feedback: null,
  count: 0,

  setFeedback: async (feedback) => {
    const res = axios.post("/feedback/createFeedback", feedback);

    toast
      .promise(res, {
        loading: "Creating feedback",
        success: (res) => res.data.message || "Feedback created successfully",
        error: (err) =>
          err?.response?.data?.message || "Error creating feedback",
      })
      .then(() => {
        get().getFeedback();
      });
  },

  getFeedback: async () => {
    try {
      const res = await axios.get("/feedback/getAllFeedback");
      set({ feedback: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deleteFeedback: async (id) => {
    const promise = axios.delete(`/feedback/deleteFeedback/${id}`);

    toast
      .promise(promise, {
        loading: "Deleting feedback",
        success: (res) => res.data.message || "Feedback deleted successfully",
        error: (err) =>
          err?.response?.data?.message || "Error deleting feedback",
      })
      .then(() => {
        get().getFeedback(); // refresh the list after deletion
      });
  },

  updateFeedback: async (id, feedback) => {
    const promise = axios.put(`/feedback/updateFeedback/${id}`, {
      name: feedback.name,
      star: feedback.star,
      description: feedback.description,
      image: feedback.image,
    });

    toast.promise(promise, {
      loading: "Updating feedback",
      success: (res) => res.data.message || "Feedback updated successfully",
      error: (err) => err?.response?.data?.message || "Error updating feedback",
    }).then(() => {
      get().getFeedback();
    })
  },
}));

export default useFeedbackStore;
