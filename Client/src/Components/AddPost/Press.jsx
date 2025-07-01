import React, { useEffect, useState } from "react";
import usePressStore from "../../store/pressStore";
import Lottie from "lottie-react";
import loading from "../../../public/loader.json";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaCamera } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
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
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold">Press Coverage</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? "Close Form" : "Add Press"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-full sm:w-64 border rounded-lg bg-white focus:ring focus:ring-blue-500 mb-5"
        />

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {presses ? (
            presses.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.company_name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h4 className="text-lg font-semibold mb-1 text-blue-600">
                  {item.company_name}
                </h4>
                <p className="text-gray-600 mb-4">
                  {item.description.length > 50
                    ? item.description.slice(0, 50) + "..."
                    : item.description}
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setEditingPress(item);
                      setEditModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() =>
                      usePressStore.getState().deletePress(item._id)
                    }
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <Lottie animationData={loading} loop className="w-40 h-40" />
            </div>
          )}
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
