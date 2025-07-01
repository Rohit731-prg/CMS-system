import React, { useState } from "react";
import Press from "./AddPost/Press";
import Blogs from "./AddPost/Blogs";
import Flims from "./AddPost/Flims";
import Sidebar from "./Sideber";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const navBer = [
    { id: 0, name: "Press", link: "/" },
    { id: 1, name: "Blogs", link: "/" },
    { id: 2, name: "Flims", link: "/" },
  ];
  const [id, setID] = useState(0);

  const logOut = () => {
    useUserStore.getState().logout();
    navigate("/");
  }

  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <section className="w-full bg-gray-100 font-inter">
        <nav className="flex justify-end items-center gap-4 mb-10 bg-white px-6 py-3 shadow-md">
          <img
            src={user?.image}
            alt="User"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div className="text-left">
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
          <button
            onClick={() => logOut()}
            className="ml-3 group flex items-center justify-start w-11 h-11 bg-red-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32  active:translate-x-1 active:translate-y-1">
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              Logout
            </div>
          </button>
        </nav>
        <nav className="w-full px-10 flex justify-center mt-4 mb-6">
          <div className="flex gap-4 bg-white p-2 rounded-xl shadow-md border border-gray-200">
            {navBer.map((nav) => (
              <button
                key={nav.id}
                onClick={() => setID(nav.id)}
                className={`relative px-6 py-2 text-sm md:text-base font-medium rounded-lg transition-all duration-300
          ${
            id === nav.id
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-100"
          }`}
              >
                {nav.name}
                {id === nav.id && (
                  <span className="absolute inset-0 ring-2 ring-blue-300 rounded-lg animate-pulse pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {id === 0 && <Press />}
        {id === 1 && <Blogs />}
        {id === 2 && <Flims />}
      </section>
    </main>
  );
}

export default Post;
