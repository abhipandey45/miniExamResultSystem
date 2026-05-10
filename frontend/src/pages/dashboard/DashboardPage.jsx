import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";



const DashboardPage = () => {

  const { logout } = useAuth();

  const navigate = useNavigate();



  const handleLogout = () => {

    logout();

    navigate("/login");

  };



  return (

    <div className="min-h-screen bg-slate-100">

      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>



      <div className="p-8">

        <div className="bg-white p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold mb-3">

            Mini Exam Result System

          </h2>

          <p className="text-gray-600">

            Authentication successful.

          </p>

        </div>

      </div>

    </div>

  );

};

export default DashboardPage;