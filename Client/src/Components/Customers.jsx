import React, { useEffect, useState } from "react";
import Sidebar from "./Sideber";
import useUserStore from "../store/userStore";
import useCustomerStore from "../store/customerStore";
import Lottie from "lottie-react";
import loading from "../../public/loader.json";
import { Toaster } from "react-hot-toast";
import { IoMdSearch } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function Customers() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const customers = useCustomerStore((state) => state.customers);
  const customer = useCustomerStore((state) => state.customer);
  const getAllCustoer = useCustomerStore((state) => state.getAllCustoer);
  const total = useCustomerStore((state) => state.total);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllCustoer();
  }, []);

  const filteredCustomers = customers?.filter((cus) => {
    const query = searchQuery.toLowerCase();
    return (
      cus.bride?.toLowerCase().includes(query) ||
      cus.groom?.toLowerCase().includes(query) ||
      cus.email?.toLowerCase().includes(query) ||
      cus.phone?.toLowerCase().includes(query)
    );
  });

  const logOut = () => {
    useUserStore.getState().logout();
    navigate("/");
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen font-inter bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        {/* Navbar */}
        <nav className="flex flex-wrap justify-between md:justify-end items-center gap-4 bg-white px-4 sm:px-6 py-3 sm:py-4 shadow">
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt="User"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logOut}
            className="group flex items-center justify-start w-10 h-10 bg-red-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-28 active:translate-x-1 active:translate-y-1"
          >
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-sm sm:text-base font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              Logout
            </div>
          </button>
        </nav>

        {/* Content */}
        {customers ? (
          <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6">
            {/* Customer List */}
            <section className="w-full md:w-[40%] bg-white rounded-lg shadow p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-lg font-semibold">
                  Customers <span className="text-gray-400 ml-1">({total})</span>
                </h2>
                <div className="flex items-center border-b border-gray-400 px-2 w-full sm:w-auto">
                  <IoMdSearch className="text-xl text-gray-500" />
                  <input
                    type="text"
                    className="ml-2 outline-none bg-transparent text-sm w-full"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cus) => (
                    <div
                      key={cus._id}
                      onClick={() => useCustomerStore.getState().setCustoer(cus)}
                      className="cursor-pointer border p-3 rounded-md hover:bg-gray-100 transition"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800 truncate">
                          {cus.bride} & {cus.groom}
                        </p>
                        {!cus?.status && (
                          <GoDotFill className="text-red-500 text-xs" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{cus.email}</p>
                      <p className="text-sm text-gray-600 truncate">{cus.phone}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No customers found.</p>
                )}
              </div>
            </section>

            {/* Customer Details */}
            <section className="w-full md:w-[60%] bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
              {customer ? (
                <div className="space-y-3 text-sm text-gray-700">
                  {[
                    "bride",
                    "groom",
                    "email",
                    "phone",
                    "start_date",
                    "end_date",
                    "event",
                    "location",
                    "event_details",
                    "type",
                    "message",
                  ].map((key) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row justify-between border-b pb-2"
                    >
                      <span className="text-gray-500 font-medium capitalize w-full sm:w-1/3">
                        {key.replace("_", " ")}
                      </span>
                      <span className="w-full sm:w-2/3 text-right break-words">{customer[key]}</span>
                    </div>
                  ))}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                    <button
                      onClick={() =>
                        useCustomerStore.getState().deleteCustomer(customer._id)
                      }
                      className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      <MdDelete /> Delete Customer
                    </button>

                    {!customer.status && (
                      <button
                        className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        onClick={() =>
                          useCustomerStore.getState().updateCustomer(customer._id)
                        }
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Select a customer to view details.</p>
              )}
            </section>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <Lottie animationData={loading} loop className="w-24 h-24" />
          </div>
        )}
      </div>
      <Toaster />
    </main>
  );
}

export default Customers;
