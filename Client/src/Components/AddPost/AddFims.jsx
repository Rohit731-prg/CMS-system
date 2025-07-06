import React, { useState } from "react";
import useFilmStore from "../../store/filmStore";
import { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";

function AddFims() {
  const [state, SetState] = useState(1);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    template: null,
  });

  const [video, setVideo] = useState(null);

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (state == 0) {
      const res = await useFilmStore.getState().setFilms(details);
      if (res) SetState(1);
    } else if (state == 1) {
      const res = await useFilmStore.getState().setVideo(video);
      if (res) SetState(2);
    }
  };

  const setTemplate = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDetails({ ...details, template: reader.result });
    };
  };

  const [photos, setPhotos] = useState([""]);
  const [images, setImages] = useState([]);

  const handlePhotoChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const newPhotos = [...photos];
      newPhotos[index] = reader.result;
      setPhotos(newPhotos);
      setImages([...images, reader.result]);
    };
  };

  const handelImagesSubmit = async (e) => {
    e.preventDefault();
    await useFilmStore.getState().setImages(images);
    setPhotos([""]);
    setImages([]);
    SetState(0);
    setDetails({
      name: "",
      description: "",
      date: "",
      location: "",
      template: null,
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10 font-inter">
      <p className="text-3xl font-bold text-gray-800 mb-8">Add Film</p>

      {state === 0 && (
        <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <p className="text-xl font-semibold text-gray-700 mb-6">
            Step 1: Fill the details
          </p>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handelSubmit}
          >
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Name
                </label>
                <input
                  value={details.name}
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                  id="name"
                  type="text"
                  placeholder="Enter film name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Location
                </label>
                <input
                  id="location"
                  value={details.location}
                  onChange={(e) =>
                    setDetails({ ...details, location: e.target.value })
                  }
                  type="text"
                  placeholder="Enter location"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Date
                </label>
                <input
                  id="date"
                  value={details.date}
                  onChange={(e) =>
                    setDetails({ ...details, date: e.target.value })
                  }
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  value={details.description}
                  onChange={(e) =>
                    setDetails({ ...details, description: e.target.value })
                  }
                  placeholder="Enter description..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Template Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={setTemplate}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Next
              </button>
            </div>
          </form>
        </section>
      )}

      {state === 1 && (
        <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <p className="text-xl font-semibold text-gray-700 mb-6">
            Step 2: Upload Video
          </p>

          <form className="">
            {video && (
              <div className="w-full h-40 mb-2">
                <video src={video} width="1440" height="680" />
              </div>
            )}
            {!video && (
              <label htmlFor="video">
                <div>
                  <div className="w-full h-40 mb-2 border-[2px] flex items-center justify-center border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <IoMdAdd className="text-3xl" />
                  </div>
                </div>
              </label>
            )}
            <input id="video" className="hidden" accept="video/*" type="file" />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Next
            </button>
          </form>
        </section>
      )}

      {state === 2 && (
        <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <p className="text-xl font-semibold text-gray-700 mb-6">
            Step 3: Upload Photos
          </p>

          <form onSubmit={handelImagesSubmit} className="space-y-6">
            <div className="space-y-4">
              {photos.map((photo, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(e, index)}
                    className="block w-full text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => setPhotos([...photos, ""])}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
              >
                + Add Another Photo
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Submit
            </button>
          </form>
        </section>
      )}

      <Toaster />
    </main>
  );
}

export default AddFims;
