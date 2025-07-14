import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../Utils/axios";

const useBlogStore = create((set, get) => ({
  blog: null,
  count: 0,
  limitBlogs: null,

  setBlog: async (blogDetails) => {
    const createPromise = axios.post('/blog/createPost', blogDetails);

    try {
      const res = await toast.promise(createPromise, {
        loading: 'Creating blog...',
        success: (res) => res.data.message || 'Blog created successfully',
        error: (err) => err?.response?.data?.message || 'Failed to create blog',
      });

      get().getBlogs();
    } catch (error) {
      console.error(error);
    }
  },

  getBlogs: async () => {
    const fetchPromise = axios.get('/blog/getAllBlogs');

    try {
      const res = await toast.promise(fetchPromise, {
        loading: 'Loading blogs...',
        error: (err) => err?.response?.data?.message || 'Failed to load blogs',
      });

      set({ blog: res.data.blogs, count: res.data.count, limitBlogs: res.data.limitBlog });
    } catch (error) {
      console.error(error);
    }
  },

  updateBlog: async (id, blog) => {
    const updatePromise = axios.put(`/blog/updateBlog/${id}`, blog);

    try {
      const res = await toast.promise(updatePromise, {
        loading: 'Updating blog...',
        success: (res) => res.data.message || 'Blog updated successfully',
        error: (err) => err?.response?.data?.message || 'Failed to update blog',
      })
      set({ blog: res.data.blogs });
    } catch (error) {
      console.error(error);
    }
  },

  deleteBlog: async (id) => {
    const deletePromise = axios.delete(`/blog/deleteBlog/${id}`);

    try {
      const res = await toast.promise(deletePromise, {
        loading: 'Deleting blog...',
        success: (res) => res.data.message || 'Blog deleted successfully',
        error: (err) => err?.response?.data?.message || 'Failed to delete blog',
      })

      get().getBlogs();
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useBlogStore;
