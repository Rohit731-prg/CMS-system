import React, { useState } from "react";
import logo from "../../public/logo.png";
import { MdDashboard } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const User = useUserStore((state) => state.user);
  const [active, setActive] = useState(0);

  const navList = [
    {
      id: 0,
      icon: <MdDashboard size={20} />,
      title: "Dashboard",
      link: `/dashboard/${User._id}`,
    },
    {
      id: 1,
      icon: <IoMdAddCircleOutline size={20} />,
      title: "New Post",
      link: `/post/${User._id}`,
    },
    {
      id: 2,
      icon: <IoIosNotifications size={20} />,
      title: "CMS",
      link: "",
    },
    {
      id: 3,
      icon: <TiUserAdd size={20} />,
      title: "Add User",
      link: "",
    },
    {
      id: 4,
      icon: <FaUsers size={20} />,
      title: "Crew",
      link: "",
    },
  ];

  const changePage = (link, id) => {
    setActive(id);
    if (link) navigate(link);
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex justify-center">
        <img src={logo} alt="Logo" className="w-28 object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-1">
          {navList.map((nav) => (
            <button
              key={nav.id}
              onClick={() => changePage(nav.link, nav.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all ${
                active === nav.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <span className="text-xl">{nav.icon}</span>
              <span className="text-sm font-medium">{nav.title}</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              // Add logout logic here
            }}
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
