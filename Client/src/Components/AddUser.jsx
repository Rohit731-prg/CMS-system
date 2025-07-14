import React, { useState } from "react";
import Sidebar from "./Sideber";
import useUserStore from "../store/userStore";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [image, setImage] = useState(null);

  const handelImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
    reader.onerror = (error) => console.error("Error reading file:", error);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      name: `${newUser.firstName} ${newUser.lastName}`.trim(),
      email: newUser.email,
      password: newUser.password,
      image,
      role: newUser.role,
    };
    await useUserStore.getState().addUser(userDetails);
  };

  const logOut = () => {
    useUserStore.getState().logout();
    navigate("/");
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-inter">
      <Sidebar />

      <section className="flex-1">
        {/* Top Nav */}
        <nav className="flex flex-wrap justify-between md:justify-end items-center gap-4 mb-6 bg-white px-6 md:px-10 py-3 shadow-xl">
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt="User"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-sm md:text-base">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="group flex items-center justify-start w-10 h-10 md:w-11 md:h-11 bg-red-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-28 active:translate-x-1 active:translate-y-1"
          >
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="absolute right-4 transform translate-x-full opacity-0 text-white text-xs md:text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              Logout
            </div>
          </button>
        </nav>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-10 mb-10 w-full">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
          <form className="space-y-6" onSubmit={handelSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  required
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  placeholder="First Name"
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  required
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  placeholder="Last Name"
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                required
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Email"
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Password"
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handelImage(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
      <Toaster />
    </main>
  );
}

export default AddUser;
