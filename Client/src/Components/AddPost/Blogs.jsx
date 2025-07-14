import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaCamera } from "react-icons/fa";
import useBlogStore from "../../store/blogStore";
import Lottie from "lottie-react";
import loading from "../../../public/loader.json";
import { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

function Blogs() {
  const blogs = useBlogStore((state) => state.blog);
  const setBlogInStore = useBlogStore((state) => state.setBlog);
  const getBlogs = useBlogStore((state) => state.getBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const filterBlogs = blogs?.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.name.toLowerCase().includes(query)
    )
  })

  const [blog, setBlog] = useState({
    name: "",
    description: "",
    link: "",
    image: null,
  });
  const [showForm, setShowForm] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    getBlogs();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setBlog((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setBlogInStore(blog);
    setBlog({ name: "", description: "", link: "", image: null });
    setShowForm(false);
  };

  const handleEdit = (blogItem) => {
    setEditingBlog(blogItem);
    setEditModal(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-inter">
      <section className="max-w-6xl mx-auto mb-10">
        <div className="mb-5">
          <div className="bg-white my-3 px-10 py-2 shadow-2xl rounded-lg flex flex-row gap-3 items-center">
            <p><FaSearch /></p>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border-none w-full"
              placeholder="Search blog by name..."
              type="text" />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowForm((prev) => !prev);
                if (!showForm) {
                  setBlog({ name: "", description: "", link: "", image: null });
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {showForm ? "Cancel" : "Add Blog"}
            </button>
          </div>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
          >
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={blog.name}
                onChange={(e) => setBlog({ ...blog, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                value={blog.description}
                onChange={(e) =>
                  setBlog({ ...blog, description: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg resize-none focus:ring focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block font-medium">Link</label>
              <input
                type="text"
                value={blog.link}
                onChange={(e) => setBlog({ ...blog, link: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Image</label>
              <div className="flex items-center gap-4">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                )}
                <label
                  htmlFor="upload"
                  className="cursor-pointer w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                >
                  <FaCamera />
                </label>
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        )}

        {blogs ? (
          <main className="">
            <p className="font-semibold text-2xl mb-5">All Blogs</p>

            {filterBlogs.map((blog) => (
              <section key={blog._id} className="flex flex-row mb-5 gap-5 rounded-sm p-3 bg-white shadow">
                <section className="w-2/3">
                  <p className="font-medium text-xl ">{blog.name}</p>
                  <p className="my-2 text-sm text-gray-600">
                    {blog.description.length > 450 ? blog.description.slice(0, 450) + "..." : blog.description}
                  </p>

                  <p className="my-2 text-lg font-medium">Link  : <span className="text-blue-600">{blog.link.length > 50 ? blog.link.slice(0, 50) + "..." : blog.link}</span></p>

                  <div className="flex flex-row gap-3">
                    <button 
                    onClick={() => handleEdit(blog)}
                    className="text-sm font-semibold text-white bg-gray-800 flex flex-row gap-3 px-5 py-2 rounded-full items-center">
                      <FaEdit /> Edit
                    </button>
                    <button
                    onClick={() => useBlogStore.getState().deleteBlog(blog._id)}
                    className="text-sm font-semibold text-white bg-red-600 flex flex-row gap-3 px-5 py-2 rounded-full items-center"
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </section>
                <section className="w-1/3">
                  <img src={blog.image} alt="" className="w-full h-60 object-cover rounded-sm" />
                </section>
              </section>
            ))}
          </main>
        ) : (
          <div className="flex justify-center mt-20">
            <Lottie animationData={loading} loop className="w-40 h-40" />
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {editModal && editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
            <h3 className="text-xl font-semibold mb-4">Edit Blog</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await setBlogInStore(editingBlog);
                setEditModal(false);
                setEditingBlog(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  value={editingBlog.name}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  value={editingBlog.description}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg resize-none"
                />
              </div>
              <div>
                <label className="block font-medium">Link</label>
                <input
                  type="text"
                  value={editingBlog.link}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, link: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Image</label>
                <div className="flex items-center gap-4">
                  {editingBlog.image && (
                    <img
                      src={editingBlog.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  )}
                  <label
                    htmlFor="editUpload"
                    className="cursor-pointer w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                  >
                    <FaCamera />
                  </label>
                  <input
                    type="file"
                    id="editUpload"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setEditingBlog((prev) => ({
                          ...prev,
                          image: reader.result,
                        }));
                      reader.readAsDataURL(file);
                    }}
                    className="hidden"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditModal(false);
                    setEditingBlog(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster />
    </main>
  );
}

export default Blogs;
