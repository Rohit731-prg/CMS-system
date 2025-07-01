import React from "react";
import { useNavigate } from "react-router-dom";
import error from '../../public/error.png';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-black flex flex-row h-screen">
      <section className="w-1/2 flex flex-col items-center justify-center">
        <p className="text-white text-7xl font-inter font-semibold">
          404 - error
        </p>
        <p className="text-white text-3xl font-inter my-3">PAGE NOT FOUND</p>

        <p className="text-gray-400 font-semibold text-sm font-inter">
          The page you are looking for does not exist
        </p>

        <button
          className="rounded-full text-white mt-10 border-2 border-white px-5 py-2 cursor-pointer hover:text-black hover:bg-white font-semibold transition-all duration-300 ease-in-out"
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
      </section>
      <section className="w-1/2 flex items-center justify-center pr-[300px]">
        <img src={error} alt="" className="drop-shadow-[0_0_80px_rgba(111,144,255,0.9)]" />
      </section>
    </main>
  );
}

export default ErrorPage;
