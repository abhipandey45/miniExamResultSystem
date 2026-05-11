import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBook,
  FaPoll,
} from "react-icons/fa";



const Sidebar = () => {
  const location = useLocation();

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },

    {
      name: "Students",
      path: "/students",
      icon: <FaUserGraduate />,
    },

    {
      name: "Subjects",
      path: "/subjects",
      icon: <FaBook />,
    },

    {
      name: "Results",
      path: "/results",
      icon: <FaPoll />,
    },
  ];

  return (

    <div className="w-64 bg-slate-900 text-white min-h-screen shadow-lg">
      {/* LOGO */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          Exam Admin
        </h1>
      </div>

      {/* MENU */}
      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all

              ${
                location.pathname === item.path

                  ? "bg-blue-600"

                  : "hover:bg-slate-800"
              }
            `}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;