import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useFilmStore from "../../store/filmStore";
import { IoMdClose, IoMdAddCircle } from "react-icons/io";


function EditFilm({ setEditFilm, id }) {
  const film = useFilmStore((state) => state.singelFilm);
  useEffect(() => {
    async function fetchData() {
      await useFilmStore.getState().getFilmByID(id);
    }

    fetchData();
  }, []);

  const [openModelVideo, setOpenModelVideo] = useState(false);
  const [openModelDetals, setOpenModelDetails] = useState(false);
  const [openModelPhotos, setOpenModelPhotos] = useState(false);
  const [openModelTemplate, setOpenModelTemplate] = useState(false);

  const [fimlBasicDetails, setFimlBasicDetails] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });
  const [template, setTemplate] = useState(null);
  const [video, setVideo] = useState(null);

  const openModel = async (model) => {
    switch (model) {
      case 'details': {
        setFimlBasicDetails({
          name: film.name,
          description: film.description,
          date: film.date,
          location: film.location,
        });
        setOpenModelDetails(true);
        break;
      }
      case 'template': {
        setOpenModelTemplate(true);
        break;
      }
      case 'video': {
        setOpenModelVideo(true);
        break;
      }
    }
  }

  const handelChangeDetails = async (e) => {
    e.preventDefault();
    await useFilmStore.getState().updateBasicDetails(film._id, fimlBasicDetails);
    setOpenModelDetails(false);
  };

  const handelTemplateSubmit = async (e) => {
    e.preventDefault();
    console.log(template);
    await useFilmStore.getState().updateTemplate(film._id, template);
    setOpenModelTemplate(false);
  };

  const handelVideoChange = async (e) => {
    e.preventDefault();
    console.log(video);
    await useFilmStore.getState().updateVideo(film._id, video);
    setVideo(null);
    setOpenModelVideo(false);
  };

  const [photosArr, setPhotosArr] = useState([]);
  const [images, setImages] = useState(['']); // default: one input

  // Handle submit
  const handelChangePhotos = async (e) => {
    e.preventDefault();

    // Filter out invalid or empty base64 data
    const validImages = images.filter(img => typeof img === 'string' && img.trim().startsWith('data:image/'));

    if (validImages.length === 0) {
      toast.error("Please upload at least one valid photo.");
      return;
    }

    await useFilmStore.getState().updatePhotos(film._id, validImages);
    setOpenModelPhotos(false);
  };

  // Handle file input change
  const updateSelectedImage = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...images];
        updatedImages[index] = reader.result; // base64 string
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <>
      {film && (
        <main className="min-h-screen bg-gray-100 py-10 px-20 font-inter relative">
          <div className="flex w-full justify-end mb-10">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-sm"
              onClick={() => setEditFilm(false)}
            >
              Back
            </button>
          </div>

          <video
            controls
            className="w-full h-80 mb-4"
            src={film.video.url} />

          <div
            onClick={() => openModel('video')}
            className="flex justify-end mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-sm mb-4 active:bg-blue-700">
              Edit Video
            </button>
          </div>

          {openModelVideo && (
            <main className="absolute top-0 left-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              {openModelVideo && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-xl relative">
                    <button
                      className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 mb-5"
                      onClick={() => setOpenModelVideo(false)}
                    >
                      <IoMdClose size={24} />
                    </button>

                    <form onSubmit={handelVideoChange} className="w-full my-5">
                      <p>Upload Video</p>
                      <label htmlFor="videoinput">
                        {video && (
                          <div className="mb-4">
                            <video
                              controls
                              className="w-full h-80 mb-4"
                              src={URL.createObjectURL(video)}
                            />
                          </div>
                        )}
                        {!video && (
                          <div className="flex items-center justify-center w-full h-80 mb-4 border border-dashed border-gray-400 rounded-lg">
                            <IoMdAddCircle size={24} />
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        id="videoinput"
                        accept="video/*"
                        onChange={(e => {
                          setVideo(e.target.files[0])
                        })}
                        className="hidden" />
                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-sm">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </main>
          )}

          <p className="text-3xl font-semibold mb-3">{film?.name}</p>
          <p className="text-lg text-gray-700 font-medium mb-3">{film?.description}</p>

          <div className="flex flex-row gap-20 border-y py-4">
            <p className="text-lg text-gray-700 font-semibold">Location</p>
            <p>{film?.location}</p>
          </div>
          <div className="flex flex-row gap-20 py-4">
            <p className="text-lg text-gray-700 font-semibold">Date</p>
            <p className="">{film?.date}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => openModel('details')}
              className="bg-blue-500 text-white px-4 py-2 rounded-sm active:bg-blue-700">Edit Details</button>
          </div>

          {openModelDetals && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-xl relative">
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                  onClick={() => setOpenModelDetails(false)}
                >
                  <IoMdClose size={24} />
                </button>

                <h2 className="text-xl font-semibold text-gray-700 mb-6">Edit Film Details</h2>

                <form onSubmit={handelChangeDetails} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Film Name"
                    onChange={(e) => setFimlBasicDetails({ ...fimlBasicDetails, name: e.target.value })}
                    defaultValue={film.name}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <textarea
                    cols={4}
                    onChange={(e) => setFimlBasicDetails({ ...fimlBasicDetails, description: e.target.value })}
                    placeholder="Description"
                    defaultValue={film.description}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <input
                    type="date"
                    onChange={(e) => setFimlBasicDetails({ ...fimlBasicDetails, date: e.target.value })}
                    defaultValue={film.date?.slice(0, 10)}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <input
                    type="text"
                    onChange={(e) => setFimlBasicDetails({ ...fimlBasicDetails, location: e.target.value })}
                    placeholder="Location"
                    defaultValue={film.location}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <p className="text-lg text-gray-700 font-semibold">Photos</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-10">
            {film?.photos &&
              film?.photos.map((photo, index) => (
                <div key={index}>
                  <img src={photo.url} alt={`Photo ${index + 1}`} className="w-full h-60 rounded-lg object-cover" />
                </div>
              ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setOpenModelPhotos(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-sm active:bg-blue-700">Edit Photos</button>
          </div>

          {openModelPhotos && (
            <main className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-xl relative">
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                  onClick={() => setOpenModelPhotos(false)}
                >
                  <IoMdClose size={24} />
                </button>

                <h2 className="text-xl font-semibold text-gray-700 mb-6">Edit Film Details</h2>

                <form className="flex flex-col gap-4" onSubmit={handelChangePhotos}>
                  {photosArr.map((photo, index) => (
                    <input
                      type="file"
                      onChange={(e) => updateSelectedImage(e, index)}
                      key={index}
                      accept="image/*"
                      className="border border-gray-300 rounded px-4 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
                    />
                  ))}

                  <button
                    onClick={() => setPhotosArr([...photosArr, ''])}
                    type="button"
                    className="self-start bg-gray-100 text-gray-800 font-medium px-4 py-2 rounded border border-gray-300 hover:bg-gray-200 transition"
                  >
                    Add Photos
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </main>
          )}


          <p className="text-lg text-gray-700 font-semibold mt-10">Template</p>
          <div className="flex flex-row justify-between mb-10">
            <div className="mt-10">
              <p className="text-lg font-semibold">Documentary Film Template</p>
              <p className="text-sm text-gray-700">
                This is a standardized template document created for use in this
                film production.
              </p>
            </div>
            <img src={film?.template} alt="" className="w-1/2 rounded-sm" />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => openModel('template')}
              className="bg-blue-500 text-white px-4 py-2 rounded-sm active:bg-blue-700">
              Edit Template
            </button>
          </div>

          {openModelTemplate && (
            <main className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-xl relative">
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 mb-5"
                  onClick={() => setOpenModelTemplate(false)}
                >
                  <IoMdClose size={24} />
                </button>

                <form className="mt-5" onSubmit={handelTemplateSubmit}>
                  <label htmlFor="template">
                    {template && (
                      <img src={template} alt="" className="w-full rounded-sm" />
                    )}
                    {!template && (
                      <div className="w-full h-60 border border-gray-300 rounded-sm flex items-center justify-center">
                        <IoMdAddCircle size={24} />
                      </div>
                    )}
                  </label>
                  <input
                    accept="image/*"
                    id="template"
                    className="hidden"
                    onChange={() => {
                      const fileInput = document.getElementById('template');
                      const file = fileInput.files[0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        setTemplate(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                    type="file" />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-sm active:bg-blue-700 mt-5"
                  >
                    {template ? "Change Template" : "Upload Template"}
                  </button>
                </form>
              </div>
            </main>
          )}
          <Toaster />
        </main>
      )}
    </>
  );
}

export default EditFilm;
