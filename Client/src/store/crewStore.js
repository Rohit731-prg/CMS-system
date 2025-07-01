import { create } from 'zustand';
import axios from '../Utils/axios';
import toast from 'react-hot-toast';

const useCrewStore = create((set, get) => ({
  crew: null,
  count: 0,

  setCrew: async () => {
    const fetchPromise = axios.get('/crew/getAllCrew');

    try {
      const res = await toast.promise(fetchPromise, {
        loading: 'Fetching crew...',
        error: (err) => err?.response?.data?.message || 'Failed to fetch crew',
      });

      set({ crew: res.data.crew, count: res.data.count });
    } catch (error) {
      console.error(error);
    }
  },

  addCrew: async (crewDetails) => {
    const addPromise = axios.post('/crew/createCrew', {
      name: crewDetails.name,
      description: crewDetails.role,
      image: crewDetails.image,
    });

    try {
      await toast.promise(addPromise, {
        loading: 'Adding crew...',
        success: (res) => res.data.message || 'Crew added',
        error: (err) => err?.response?.data?.message || 'Failed to add crew',
      });

      get().setCrew();
    } catch (error) {
      console.error(error);
    }
  },

  deleteCrew: async (id) => {
    const deletePromise = axios.delete(`/crew/deleteCrew/${id}`);

    try {
      await toast.promise(deletePromise, {
        loading: 'Deleting crew...',
        success: (res) => res.data.message || 'Crew deleted',
        error: (err) => err?.response?.data?.message || 'Failed to delete crew',
      });

      get().setCrew();
    } catch (error) {
      console.error(error);
    }
  },

  updateCrew: async (id, crewDetails) => {
    const update = axios.put(`/crew/updateCrew/${id}`, crewDetails);

    try {
      const res = await toast.promise(update, {
        loading: 'Updating crew...',
        success: (res) => res.data.message || 'Crew updated',
        error: (err) => err?.response?.data?.message || 'Failed to update crew',
      })
      set({ crew: res.data.crew });
      
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useCrewStore;
