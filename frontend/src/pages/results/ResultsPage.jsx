import {
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const ResultsPage = () => {

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const fetchResults = async () => {

    try {
      const { data } =
        await API.get(
          `/results?search=${search}`
        );

      setResults(data);

    } catch (error) {

      toast.error(
        "Failed to fetch results"
      );

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchResults();
  }, [search]);

  const deleteResult = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this result?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/results/${id}`
      );

      toast.success(
        "Result deleted successfully"
      );

      fetchResults();

    } catch (error) {

      toast.error(
        "Failed to delete result"
      );

    }

  };



  return (

    <AdminLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            Results

          </h1>

          <p className="text-gray-500 mt-1">

            Manage student results

          </p>

        </div>



        <Link
          to="/results/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >

          + Add Result

        </Link>

      </div>



      {/* SEARCH */}

      <div className="mb-5">

        <input
          type="text"
          placeholder="Search by exam name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3"
        />

      </div>



      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        {loading ? (

          <div className="p-8 text-center">

            Loading...

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Student
                </th>

                <th className="text-left p-4">
                  Roll No
                </th>

                <th className="text-left p-4">
                  Exam
                </th>

                <th className="text-left p-4">
                  Percentage
                </th>

                <th className="text-left p-4">
                  Grade
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>



            <tbody>

              {results.map((result) => (

                <tr
                  key={result._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {result.studentId?.name}
                  </td>

                  <td className="p-4">
                    {
                      result.studentId
                        ?.rollNumber
                    }
                  </td>

                  <td className="p-4">
                    {result.examName}
                  </td>

                  <td className="p-4">
                    {result.percentage}%
                  </td>

                  <td className="p-4">
                    {result.grade}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm

                        ${
                          result.status ===
                          "Pass"

                            ? "bg-green-500"

                            : "bg-red-500"
                        }
                      `}
                    >

                      {result.status}

                    </span>

                  </td>



                  <td className="p-4 flex gap-3">

                    <Link
                      to={`/results/${result._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>



                    <button
                      onClick={() =>
                        deleteResult(
                          result._id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </AdminLayout>

  );

};

export default ResultsPage;