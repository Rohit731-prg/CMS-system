import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AddFiml from "./AddFims";
import useFilmStore from "../../store/filmStore";
import EditFilm from "./EditFilm";
import { MdDelete } from "react-icons/md";

function Flims() {
  const [addFilm, setAddFilm] = useState(false);
  const [editFilm, setEditFilm] = useState(false);
  const films = useFilmStore((state) => state.film);
  const [id, setId] = useState(null);

  useEffect(() => {
    useFilmStore.getState().getFilms();
  }, []);

  const openEditFilm = (id) => {
    setId(id);
    setEditFilm(true);
  };

  const [search, setSearch] = useState('');
  const filterFilm = films?.filter((film) => {
    return film.name.toLowerCase().includes(search.toLowerCase());
  })
  return (
    <>
      {editFilm && <EditFilm setEditFilm={setEditFilm} id={id} />}
      {!editFilm && (
        <main className="min-h-screen bg-gray-100 p-6">
          <nav className="flex flex-row gap-10 px-10">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 rounded-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              type="text"
            />

            <button
              onClick={() => setAddFilm(!addFilm)}
              className="text-white bg-blue-500 px-3 py-2 rounded-sm cursor-pointer"
            >
              {addFilm ? "Close" : "Add Film"}
            </button>
          </nav>

          {addFilm && <AddFiml />}
          {!addFilm && (
            <main className="px-10">
              <p className="text-2xl font-semibold mt-10">All Films</p>

              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 md:px-10 py-6">
                {films && films.length > 0 ? (
                  filterFilm.map((film) => (
                    <div
                      key={film._id}
                      className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                    >
                      <img
                        onClick={() => openEditFilm(film._id)}
                        src={film.template}
                        alt={film.name}
                        className="w-full h-56 object-cover"
                      />

                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-4 rounded-b-xl">
                        <h3 className="text-lg font-semibold">{film.name}</h3>
                        <div className="flex flex-row justify-between items-end">
                          <p className="text-sm">
                            {film.description?.length < 50
                              ? film.description
                              : `${film.description.slice(0, 50)}...`}
                          </p>
                          <button
                            onClick={() => useFilmStore.getState().deleteFilm(film._id)}
                            className="text-white bg-red-500 p-3 rounded-sm transition duration-200 active:bg-red-600"
                          >
                              <MdDelete />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 text-lg">
                      No films available. Please add a film.
                    </p>
                  </div>
                )}
              </section>
            </main>
          )}
          <Toaster />
        </main>
      )}
    </>
  );
}

export default Flims;
