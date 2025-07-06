import React, { useEffect, useState } from "react";
import Sidebar from "./Sideber";
import useUserStore from "../store/userStore";
import useCrewStore from "../store/crewStore";
import { FaCamera, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Lottie from "lottie-react";
import loading from "../../public/loader.json";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Crew() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const crews = useCrewStore((state) => state.crew);
  const [crew, setCrew] = useState({ name: "", role: "", image: null });
  const [showForm, setShowForm] = useState(false);
  const [editCrew, setEditCrew] = useState(null);

  useEffect(() => {
    useCrewStore.getState().setCrew();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editCrew) {
      console.log(editCrew);
      await useCrewStore.getState().updateCrew(editCrew._id, crew);
    } else {
      await useCrewStore.getState().addCrew(crew);
    }
    setCrew({ name: "", description: "", image: null });
    setShowForm(false);
    setEditCrew(null);
  };

  const handleEdit = (crew) => {
    setCrew({
      name: crew.name,
      description: crew.description,
      image: crew.image,
    });
    setEditCrew(crew);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCrew((prev) => ({ ...prev, image: reader.result }));
    };
  };

  const handleLogout = () => {
    useUserStore.getState().logout();
    navigate("/");
  };

  return (
    <main className="bg-gray-100 min-h-screen flex font-inter">
      <Sidebar />
      <section className="w-full">
        <nav className="flex justify-between items-center bg-white px-6 py-3 shadow-md">
          <div></div>
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt="User"
              className="w-10 h-10 rounded-full border object-cover"
            />
            <div className="text-right">
              <p className="font-semibold text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={() => handleLogout()}
              className="ml-3 group flex items-center justify-start w-11 h-11 bg-red-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32  active:translate-x-1 active:translate-y-1"
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                Logout
              </div>
            </button>
          </div>
        </nav>

        <div className="p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Crew Members
            </h2>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditCrew(null);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {showForm ? "Cancel" : "Add Crew"}
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="col-span-1 flex flex-col items-center">
                <label className="text-sm text-gray-600 mb-2">
                  Profile Image
                </label>
                <div className="relative w-28 h-28 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  {crew.image ? (
                    <img
                      src={crew.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaCamera className="text-2xl text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="text-sm text-gray-600 mb-1 block">Name</label>
                <input
                  required
                  type="text"
                  value={crew.name}
                  onChange={(e) => setCrew({ ...crew, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>

              <div className="col-span-1">
                <label className="text-sm text-gray-600 mb-1 block">Role</label>
                <input
                  type="text"
                  required
                  value={crew.description}
                  onChange={(e) =>
                    setCrew({ ...crew, description: e.target.value })
                  }
                  placeholder="Role"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>

              <div className="col-span-1 md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  {editCrew ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          )}

          {crews ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {crews.map((crew) => (
                <div
                  key={crew._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={crew.image}
                    alt={crew.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {crew.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {crew.description}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() =>
                          useCrewStore.getState().deleteCrew(crew._id)
                        }
                        className="flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
                      >
                        <MdDelete /> Delete
                      </button>
                      <button
                        onClick={() => handleEdit(crew)}
                        className="flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-sm"
                      >
                        <FaEdit /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10">
              <Lottie animationData={loading} className="w-40 h-40" />
            </div>
          )}
        </div>
        <Toaster />
      </section>
    </main>
  );
}

export default Crew;
