import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import useUserStore from '../store/userStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await useUserStore.getState().setUser(user);
    if (res ) navigate(`/dashboard/${res}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={isPasswordShow ? 'text' : 'password'}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <Toaster />
      </div>
    </main>
  );
}

export default Login;
