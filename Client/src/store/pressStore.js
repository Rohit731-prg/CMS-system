import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../Utils/axios';

const usePressStore = create((set, get) => ({
  press: null,
  count: 0,
  limitPress: null,

  setPress: async () => {
    const fetchPromise = axios.get('/press/getAllPress');

    try {
      const res = await toast.promise(fetchPromise, {
        loading: 'Fetching press items...',
        error: (err) => err?.response?.data?.message || 'Failed to fetch press items',
      });

      set({
        press: res.data.press,
        count: res.data.count,
        limitPress: res.data.limitPress,
      });
    } catch (error) {
      console.error(error);
    }
  },

  addPress: async (pressDetails) => {
    const addPromise = axios.post('/press/createPress', pressDetails);

    try {
      await toast.promise(addPromise, {
        loading: 'Adding press item...',
        success: (res) => res.data.message || 'Press item added successfully',
        error: (err) => err?.response?.data?.message || 'Failed to add press item',
      });

      get().setPress();
    } catch (error) {
      console.error(error);
    }
  },

  deletePress: async (id) => {
    const deletePromise = axios.delete(`/press/deletePress/${id}`);

    try {
      await toast.promise(deletePromise, {
        loading: 'Deleting press item...',
        success: (res) => res.data.message || 'Press item deleted successfully',
        error: (err) => err?.response?.data?.message || 'Failed to delete press item',
      });

      get().setPress();
    } catch (error) {
      console.error(error);
    }
  }
}));

export default usePressStore;
