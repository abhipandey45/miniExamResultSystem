import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const AdminLayout = ({
  children,
}) => {

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;