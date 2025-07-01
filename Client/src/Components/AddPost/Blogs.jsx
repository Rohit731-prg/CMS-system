import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaCamera } from "react-icons/fa";
import useBlogStore from "../../store/blogStore";
import Lottie from "lottie-react";
import loading from "../../../public/loader.json";
import { Toaster } from "react-hot-toast";

function Blogs() {
  const blogs = useBlogStore((state) => state.blog);
  const setBlogInStore = useBlogStore((state) => state.setBlog);
  const deleteBlog = useBlogStore((state) => state.deleteBlog);
  const getBlogs = useBlogStore((state) => state.getBlogs);

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
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="max-w-6xl mx-auto mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Blogs</h2>
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

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full sm:w-64 border rounded-lg bg-white focus:ring focus:ring-blue-500"
          />
        </div>

        {blogs ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <div
                key={b._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                {b.image && (
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-44 object-cover rounded-md mb-3"
                  />
                )}
                <h4 className="text-lg font-semibold">{b.name}</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {b.description?.length > 60
                    ? b.description.slice(0, 60) + "..."
                    : b.description}
                </p>
                <p
                  onClick={() => window.open(b.link, "_blank")}
                  className="text-blue-500 text-sm cursor-pointer break-all mb-3"
                >
                  {b.link?.length > 30 ? b.link.slice(0, 30) + "..." : b.link}
                </p>
                <div className="flex justify-end gap-6">
                  <button
                    onClick={() => handleEdit(b)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(b._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                  >
                    <MdDelete />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
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
