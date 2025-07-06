import React from "react";
import logo from "../../public/logo.png";
import { MdDashboard, MdFeedback } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import useUserStore from "../store/userStore";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const navList = [
    {
      id: 0,
      icon: <MdDashboard size={20} />,
      title: "Dashboard",
      link: `/dashboardAdmin/${user?._id}`,
    },
    {
      id: 1,
      icon: <IoMdAddCircleOutline size={20} />,
      title: "New Post",
      link: `/post/${user?._id}`,
    },
    {
      id: 2,
      icon: <IoIosNotifications size={20} />,
      title: "Customers",
      link: `/customer/${user?._id}`,
    },
    {
      id: 3,
      icon: <TiUserAdd size={20} />,
      title: "Add User",
      link: `/adduser/${user?._id}`,
    },
    {
      id: 4,
      icon: <FaUsers size={20} />,
      title: "Crew",
      link: `/crew/${user?._id}`,
    },
    {
      id: 5,
      icon: <MdFeedback size={20} />,
      title: "Feedback",
      link: `/feedback/${user?._id}`,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 h-auto bg-white shadow-md flex flex-col font-inter">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex justify-center">
        <img src={logo} alt="Logo" className="w-28 object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-1">
          {navList.map((nav) => {
            const isActive = location.pathname.includes(nav.link.split("/")[1]);

            return (
              <button
                key={nav.id}
                onClick={() => navigate(nav.link)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                <span className="text-xl">{nav.icon}</span>
                <span className="text-sm font-medium">{nav.title}</span>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-gray-200 font-inter">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-red-600 hover:bg-red-100 transition-all"
          >
            <CiLogout size={20} />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
