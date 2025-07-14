import React, { useEffect, useState } from "react";
import usePressStore from "../../store/pressStore";
import Lottie from "lottie-react";
import loading from "../../../public/loader.json";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaCamera } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

function Press() {
  const presses = usePressStore((state) => state.press);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingPress, setEditingPress] = useState(null);

  const [press, setPress] = useState({
    company_name: "",
    description: "",
    link: "",
    image: null,
  });

  const resetForm = () => {
    setPress({ company_name: "", description: "", image: null });
  };

  const handleImage = (e, setter) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setter((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await usePressStore.getState().addPress(press);
    resetForm();
    setShowForm(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await usePressStore.getState().updatePress(editingPress._id, editingPress);
    setEditModal(false);
  };

  const fetchPress = async () => {
    await usePressStore.getState().setPress();
  };

  const filteredPresses = presses?.filter((item) =>
    item.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPress();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-inter">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-4 bg-white px-5 py-2 rounded-lg gap-3 shadow-xl">
          <FaSearch />
          <input
            placeholder="Search by Company Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none w-full"
            type="text"
          />
        </div>
        <div className="w-full flex justify-end mb-5">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? "Close Form" : "Add Press"}
          </button>
        </div>
        {showForm && (
          <section className="bg-white p-6 rounded-2xl shadow mb-10">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                placeholder="Company Name"
                value={press.company_name}
                onChange={(e) =>
                  setPress({ ...press, company_name: e.target.value })
                }
                className="px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={press.description}
                onChange={(e) =>
                  setPress({ ...press, description: e.target.value })
                }
                className="px-4 py-2 border rounded-lg resize-none"
                rows={4}
              />
              <input
                placeholder="Link to Press"
                value={press.link}
                className="px-4 py-2 border rounded-lg"
                onChange={(e) => setPress({ ...press, link: e.target.value })}
                type="text" />
              <div className="flex items-center gap-4">
                {press.image && (
                  <img
                    src={press.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                )}
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-200 transition"
                >
                  <FaCamera className="text-xl" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => handleImage(e, setPress)}
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </section>
        )}

        <p className="font-semibold text-2xl mb-5">All Press</p>
        <div className="w-full">
          <div className="flex flex-col gap-5 w-full">
            {presses ? (
              filteredPresses.map((press) => (
                <main key={press._id} className="flex flex-row w-full gap-5 shadow p-5 bg-white">
                  <section className="w-2/3 ">
                    <p className="font-medium text-xl">
                      {press.company_name}
                    </p>
                    <p className="text-sm text-gray-600 my-2">
                      {press.description.length < 450 ? press.description : `${press.description.slice(0, 450)}...`}
                    </p>
                    <p className="my-2 text-lg font-medium">Link  : <span className="text-blue-600">{press?.link.length > 50 ? press?.link.slice(0, 50) + "..." : press?.link}</span></p>

                    <div className="flex items-center gap-4 flex-row mt-3">
                      <button
                        className="text-lg bg-red-600 hover:bg-red-700 transition flex flex-row gap-2 items-center px-5 py-1 rounded-full text-white"
                        onClick={() => usePressStore.getState().deletePress(press._id)}
                      >
                        <MdDelete/>
                        Delete
                      </button>
                      <button
                        className="text-lg bg-blue-600 hover:bg-blue-700 transition flex flex-row gap-2 items-center px-5 py-1 rounded-full text-white"
                        onClick={() => {
                          setEditingPress(press);
                          setEditModal(true);
                        }}>
                        <FaEdit/>
                        Edit
                      </button>
                    </div>
                  </section>
                  <section className="w-1/3">
                    <img src={press.image} alt="" className="w-full h-60 object-cover rounded-lg" />
                  </section>
                </main>
              ))
            ) : (
              <div className="col-span-full flex justify-center">
                <Lottie animationData={loading} loop className="w-40 h-40" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog
        open={editModal}
        onClose={() => setEditModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Edit Press
            </Dialog.Title>
            {editingPress && (
              <form onSubmit={handleEdit} className="grid gap-4">
                <input
                  type="text"
                  value={editingPress.company_name}
                  onChange={(e) =>
                    setEditingPress({
                      ...editingPress,
                      company_name: e.target.value,
                    })
                  }
                  className="px-4 py-2 border rounded-lg"
                />
                <textarea
                  value={editingPress.description}
                  onChange={(e) =>
                    setEditingPress({
                      ...editingPress,
                      description: e.target.value,
                    })
                  }
                  className="px-4 py-2 border rounded-lg resize-none"
                  rows={4}
                />
                <input
                  placeholder="Link to Press"
                  value={editingPress.link}
                  className="px-4 py-2 border rounded-lg"
                  onChange={(e) => setEditingPress({ ...editingPress, link: e.target.value })}
                  type="text" />
                <div className="flex items-center gap-4">
                  {editingPress.image && (
                    <img
                      src={editingPress.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  )}
                  <label
                    htmlFor="editImage"
                    className="cursor-pointer w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-200 transition"
                  >
                    <FaCamera className="text-xl" />
                  </label>
                  <input
                    type="file"
                    id="editImage"
                    accept="image/*"
                    onChange={(e) => handleImage(e, setEditingPress)}
                    className="hidden"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      <Toaster />
    </main>
  );
}

export default Press;
