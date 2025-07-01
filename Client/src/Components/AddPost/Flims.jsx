import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

function Flims() {
  const [showForm, setShowForm] = useState(false);
  const [fime, setFilms] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    template: null,
    video: null,
    photos: [],
  });

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="max-w-6xl mx-auto mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Films</h2>
          <button
            onClick={() => {
              setShowForm((prev) => !prev);
              if (!showForm) {
                // setEditMode(false);
                setFilms({
                  name: "",
                  description: "",
                  date: "",
                  location: "",
                  template: null,
                  video: null,
                  photos: [],
                });
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? "Cancel" : "Add Film"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handelSubmit}
            className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
          >
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={fime.name}
                onChange={(e) => setBlog({ ...fime, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                type="text"
                value={fime.description}
                onChange={(e) =>
                  setBlog({ ...fime, description: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Date</label>
                <input
                  type="date"
                  value={fime.date}
                  onChange={(e) => setBlog({ ...fime, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium">Location</label>
                <input
                  type="text"
                  value={fime.location}
                  onChange={(e) =>
                    setBlog({ ...fime, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Template</label>
                <input type="file" />
              </div>
              <div>
                <label className="block font-medium">Video</label>
                <input type="file" />
              </div>
            </div>

            <div className="flex flex-row">
              <div>
                {fime.photos.map((photo, index) => (
                  <input key={index} type="file" />
                ))}
              </div>

              <button 
              className="bg-blue-600 text-white w-[80px] h-[80px] rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              type="button">
                  <IoIosAddCircle className="text-3xl" />
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
      </section>
    </main>
  );
}

export default Flims;
