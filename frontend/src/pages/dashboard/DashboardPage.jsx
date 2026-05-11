import {
  useEffect,
  useState,
} from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import SummaryCard from "../../components/dashboard/SummaryCard";

const DashboardPage = () => {

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);



  const fetchDashboardData =
    async () => {
      try {
        const { data } =
          await API.get(
            "/dashboard/summary"
          );

        setSummary(data);

      } catch (error) {

        toast.error(
          "Failed to load dashboard"
        );

      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (

    <AdminLayout>
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to Exam Result Admin Panel
        </p>
      </div>

      {/* SUMMARY GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <SummaryCard
          title="Total Students"
          value={summary.totalStudents}
        />

        <SummaryCard
          title="Total Subjects"
          value={summary.totalSubjects}
        />

        <SummaryCard
          title="Total Results"
          value={summary.totalResults}
        />

        <SummaryCard
          title="Passed Students"
          value={summary.passedStudents}
        />

        <SummaryCard
          title="Failed Students"
          value={summary.failedStudents}
        />
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;