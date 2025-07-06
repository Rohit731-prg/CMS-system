import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useFilmStore from "../../store/filmStore";

function EditFilm({ setEditFilm, id }) {
  const [film, setFilm] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await useFilmStore.getState().getFilmByID(id);
      setFilm(data);
    }

    fetchData();
  }, []);

  return (
    <>
      {film && (
        <main className="min-h-screen bg-gray-100 py-10 px-20 font-inter">
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
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />

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
            <button className="bg-blue-500 text-white px-4 py-2 rounded-sm active:bg-blue-700">Edit</button>
          </div>

          <p className="text-lg text-gray-700 font-semibold">Photos</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-10">
            {film?.photos &&
              film?.photos.map((photo, index) => (
                <div key={index}>
                  <img src={photo.url} alt={`Photo ${index + 1}`} className="w-full h-60 rounded-sm object-cover" />
                </div>
              ))}
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-sm active:bg-blue-700">Edit Photos</button>
          </div>

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
            className="bg-blue-500 text-white px-4 py-2 rounded-sm active:bg-blue-700">
              Edit Template
            </button>
          </div>
          <Toaster />
        </main>
      )}
    </>
  );
}

export default EditFilm;
