import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import axios from '../Utils/axios';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      setUser: async (userData) => {
        const loginPromise = axios.post('/Admin/login', {
          email: userData.email,
          password: userData.password,
        });

        try {
          const res = await toast.promise(loginPromise, {
            loading: 'Logging in...',
            success: (res) => res.data.message || 'Login successful',
            error: (err) =>
              (err?.response?.data?.message || 'Login failed'),
          });

          const user = res.data.user;
          set({ user });
          return user._id;
        } catch (error) {
          console.error(error);
        }
      },

      logout: () => {
        set({ user: null });
        toast.success('Logged out');
      },

      addUser: async (userDetails) => {
        const addUserPromise = axios.post('/Admin/createAdmin', userDetails);

        try {
          await toast.promise(addUserPromise, {
            loading: 'Creating user...',
            success: (res) => res.data.message || 'User created!',
            error: (err) =>
              (err?.response?.data?.message || 'Could not create user'),
          });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;
