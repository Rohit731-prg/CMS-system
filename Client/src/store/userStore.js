import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import axios from '../Utils/axios';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      setUser: async (userData) => {
        try {
          const res = await axios.post('/Admin/login', {
            email: userData.email,
            password: userData.password,
          });

          const user = res.data.user;
          set({ user });
          toast.success(res.data.message);
          return user._id;
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.message);
        }
      },

      logout: () => {
        set({ user: null });
        toast.success("Logged out");
      },

      addUser: async (userDetails) => {
        try {
            const res = await axios.post('/Admin/createAdmin', userDetails);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
      }
    }),
    {
      name: 'user-storage', // localStorage key
      partialize: (state) => ({ user: state.user }), // optional: only persist `user`
    }
  )
);

export default useUserStore;
