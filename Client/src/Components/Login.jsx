import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import useUserStore from '../store/userStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import login from '../../public/login.json';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await useUserStore.getState().setUser(user);
    if (res) navigate(`/dashboardAdmin/${res}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 font-inter flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden">
        
        {/* Form Section */}
        <section className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={isPasswordShow ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordShow(!isPasswordShow)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {isPasswordShow ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </section>

        {/* Animation Section */}
        <section className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-blue-50 p-8">
          <Lottie animationData={login} loop={true} className="w-full h-96" />
        </section>
      </div>

      <Toaster position="top-center" />
    </main>
  );
}

export default Login;
