import React from "react";
import Sidebar from "./Sideber";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useFeedbackStore from "../store/feedbackStore";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function Feedback() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const feedbacks = useFeedbackStore((state) => state.feedback);
  const [showAdd, setShowAdd] = useState(false);
  const [editFeedback, setEditFeedback] = useState(false);
  const tableHead = ["Name", "Description", "Image", "Star", "Action"];
  const [feedback, setFeedback] = useState({
    name: "",
    description: "",
    star: 0,
    image: null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const filterFeedbacks = feedbacks?.filter((feedback) => {
    const query = searchQuery.toLowerCase();
    return (
      feedback.name.toLowerCase().includes(query)
    )
  })

  const logout = () => {
    useUserStore.getState().logout();
    navigate("/");
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.star) return toast.error("Select a star");

    await useFeedbackStore.getState().setFeedback(feedback);
    setFeedback({
      name: "",
      description: "",
      star: 0,
      image: null,
    });
    setShowAdd(false);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFeedback({ ...feedback, image: reader.result });
    };
  };

  const handelEdit = async (feedback) => {
    setFeedback(feedback);
    setEditFeedback(true);

  };

  const saveEditChanges = async (e) => {
    e.preventDefault();

    if(feedback.image == null) return toast.error("Select an image");
    await useFeedbackStore.getState().updateFeedback(feedback._id, feedback);
    setFeedback({
      name: "",
      description: "",
      star: 0,
      image: null,
    });
    setEditFeedback(false);
  }

  useEffect(() => {
    useFeedbackStore.getState().getFeedback();
  }, []);

  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <main className="w-full bg-gray-100 font-inter">
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
            onClick={() => logout()}
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
        </nav>

        {showAdd && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowAdd(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                &times;
              </button>

              <p className="text-xl font-semibold mb-4">Add Feedback</p>

              <form onSubmit={handelSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={feedback.name}
                  required
                  onChange={(e) =>
                    setFeedback({ ...feedback, name: e.target.value })
                  }
                  placeholder="Name"
                  className="border p-2 rounded"
                />
                <textarea
                  type="text"
                  required
                  value={feedback.description}
                  onChange={(e) =>
                    setFeedback({ ...feedback, description: e.target.value })
                  }
                  placeholder="Description"
                  className="border p-2 rounded"
                />
                <select
                  required
                  value={feedback.star}
                  onChange={(e) =>
                    setFeedback({ ...feedback, star: e.target.value })
                  }
                  className="border p-2 rounded"
                >
                  <option value="">Select Rating</option>
                  {[...Array(5)].map((_, index) => (
                    <option key={index + 1}>{index + 1}</option>
                  ))}
                </select>
                <label htmlFor="image">Select a image</label>
                <input
                  onChange={updateImage}
                  required
                  id="image"
                  accept="image/*"
                  type="file"
                  className="border p-2 rounded"
                />

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        {editFeedback && (
          <main className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">
              <button
                onClick={() => setEditFeedback(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                &times;
              </button>
              <p className="text-xl font-semibold mb-4">Edit Feedback</p>

              <form onSubmit={saveEditChanges} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={feedback.name}
                  required
                  onChange={(e) =>
                    setFeedback({ ...feedback, name: e.target.value })
                  }
                  placeholder="Name"
                  className="border p-2 rounded"
                />
                <textarea 
                placeholder="Description"
                required
                value={feedback.description}
                onChange={(e) =>
                  setFeedback({ ...feedback, description: e.target.value })
                }
                className="border p-2 rounded"
                />
                <select
                  required
                  value={feedback.star}
                  onChange={(e) =>
                    setFeedback({ ...feedback, star: e.target.value })
                  }
                  className="border p-2 rounded"
                >
                  <option value="">Select Rating</option>
                  {[...Array(5)].map((_, index) => (
                    <option key={index + 1}>{index + 1}</option>
                  ))}
                </select>
                <label htmlFor="image">Select a image</label>
                <input
                onChange={updateImage}
                required
                id="image"
                accept="image/*"
                type="file" />

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </main>
        )}

        <section className="px-32 relative">
          <p className="text-4xl font-semibold">Feedback Management</p>
          <p className="text-gray-500 text-sm my-1">
            Manage and respond to user feedback and testimonials
          </p>

          <div className="bg-white px-5 py-2 flex flex-row items-center my-5 rounded-lg gap-3 shadow-xl">
            <p>
              <IoMdSearch />
            </p>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-none w-full"
              placeholder="Search Testimonials..."
              type="text"
            />
          </div>

          <div className="flex flex-row gap-10 items-center my-5 px-2">
            <p className="font-semibold text-xl">Testimonials</p>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="px-5 py-2 bg-blue-500 cursor-pointer text-white rounded-lg active:bg-blue-800"
            >
              Add Testimonial
            </button>
          </div>

          <section className="bg-white flex flex-col p-5 rounded-lg">
            {feedbacks && (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-white uppercase bg-gray-800">
                  <tr>
                    {tableHead.map((head, index) => (
                      <th className="px-6 py-3" key={index}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filterFeedbacks.map((feedback, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 border-b border-gray-200"
                    >
                      <td className="px-6 py-4 text-black font-medium">
                        {feedback.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {feedback.description.length > 30
                          ? feedback.description.slice(0, 100) + "..."
                          : feedback.description}
                      </td>

                      <td className="px-6 py-4">
                        <img
                          src={feedback.image}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover "
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {feedback.star} Stars
                      </td>
                      <td className="px-6 py-4 flex flex-row gap-2">
                        <button
                          onClick={() =>
                            useFeedbackStore
                              .getState()
                              .deleteFeedback(feedback._id)
                          }
                          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg active:bg-red-800 text-xl"
                        >
                          <MdDelete />
                        </button>
                        <button
                          onClick={() => handelEdit(feedback)}
                          className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg active:bg-gray-800 text-xl"
                        >
                          <CiEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </section>
      </main>
      <Toaster />
    </main>
  );
}

export default Feedback;
