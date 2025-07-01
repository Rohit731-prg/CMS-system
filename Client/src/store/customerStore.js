import { create } from 'zustand'
import toast from 'react-hot-toast';
import axios from '../Utils/axios';

const useCustomerStore = create((set, get) => ({
  customer: [],
  customers: null,
  total: 0,
  new: 0,
  dashboard: [],

  getAllCustoer: async () => {
      try {
        const res = await axios.get('/customer/getAllCustomer');
        console.log(res.data);
        set({ customers: res.data.customers });
        set({ customer: res.data.customers[0] });
        set({ total: res.data.total });
        set({ new: res.data.count });
        set({ dashboard: res.data.newDashboard });

      } catch (error) {
        toast.error(error.response.data.message);
      }
  },

  setCustoer: (customerDetsils) => {
    set({ customer: customerDetsils });
  },

  deleteCustomer: async (id) => {
    try {
      const res = await axios.delete(`/customer/deleteCustomer/${id}`);
      toast.success(res.data.message);
      get().getAllCustoer();
      set({ customer: customers[0] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateCustomer: async (id) => {
    const update = axios.put(`/customer/updateCustomer/${id}`);

    try {
      const res = await toast.promise(update, {
        loading: 'Updating customer...',
        success: (res) => res.data.message || 'Customer updated',
        error: (err) => err?.response?.data?.message || 'Failed to update customer',
      })
      get().getAllCustoer();
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useCustomerStore;