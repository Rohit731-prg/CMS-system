import React, { useEffect } from "react";
import Sideber from "./Sideber";
import useUserStore from "../store/userStore";
import useBlogStore from "../store/blogStore";
import usePressStore from "../store/pressStore";
import useCustomerStore from "../store/customerStore";
import { GoDotFill } from "react-icons/go";
import Lottie from "lottie-react";
import loading from "../../public/loader.json";
import { useNavigate, useParams } from "react-router-dom";
import useCrewStore from "../store/crewStore";

function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const blogCount = useBlogStore((state) => state.count);
  const pressCount = usePressStore((state) => state.count);
  const CrewCount = useCrewStore((state) => state.count);
  const customerCount = useCustomerStore((state) => state.new);
  const customers = useCustomerStore((state) => state.dashboard);
  const blogs = useBlogStore((state) => state.limitBlogs);
  const presses = usePressStore((state) => state.limitPress);

  const overViewDetails = [
    { title: "Total Blogs", value: blogCount },
    { title: "Total Press", value: pressCount },
    { title: "Total Crew", value: CrewCount },
    { title: "New Customers", value: customerCount },
  ];

  const fetchData = async () => {
    await Promise.all([
      useBlogStore.getState().getBlogs(),
      usePressStore.getState().setPress(),
      useCrewStore.getState().setCrew(),
      useCustomerStore.getState().getAllCustoer(),
    ]);
  };

  const openLink = (link) => {
    window.open(link, "_blank");
  };

  const logOut = () => {
    useUserStore.getState().logout();
    navigate("/");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex font-inter bg-gray-50 min-h-screen">
      <Sideber />

      <section className="flex-1">
        <nav className="flex justify-end items-center gap-4 mb-10 bg-white px-6 py-3 shadow-md">
          <img
            src={user?.image}
            alt="User"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div className="text-left">
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>

          <button
            onClick={() => logOut()}
            className="ml-3 group flex items-center justify-start w-11 h-11 bg-red-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32  active:translate-x-1 active:translate-y-1">
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              Logout
            </div>
          </button>
        </nav>

        <div>
          
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-10">
          {overViewDetails.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <p className="text-gray-500 font-medium">{item.title}</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="bg-white p-6 rounded-xl shadow mb-10 mx-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">Recent Blogs</h2>
            <button
              onClick={() => navigate(`/post/${id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View All
            </button>
          </div>

          {blogs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {blogs.map((blg) => (
                <div
                  key={blg._id}
                  onClick={() => openLink(blg.link)}
                  className="cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg p-3 border border-gray-200"
                >
                  <img
                    src={blg.image}
                    alt=""
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <div className="mt-2">
                    <p className="font-semibold text-gray-800 truncate">
                      {blg.name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {blg.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Lottie animationData={loading} loop={true} />
            </div>
          )}
        </section>

        <section className="bg-white p-6 rounded-xl shadow mb-10 mx-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">Recent Press</h2>
            <button 
            onClick={() => navigate(`/post/${id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              View All
            </button>
          </div>

          {presses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {presses.map((pre) => (
                <div key={pre._id} className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 border border-gray-200">
                  <img
                    src={pre.image}
                    alt=""
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <div className="mt-2">
                    <p className="font-semibold text-gray-800 truncate">
                      {pre.company_name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {pre.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Lottie animationData={loading} loop={true} />
            </div>
          )}
        </section>

        <section className="bg-white p-6 rounded-xl shadow mb-10 mx-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">Recent Customers</h2>
            <button 
            onClick={() => navigate(`/customer/${id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {customers?.map((customer, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:shadow-md"
              >
                <div>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    {customer?.bride} & {customer?.groom}
                    {!customer?.status && (
                      <GoDotFill className="text-red-500 text-sm" />
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{customer?.email}</p>
                </div>
                <div className="text-sm text-gray-600">{customer?.phone}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
