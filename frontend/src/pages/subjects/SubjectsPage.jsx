import {
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";


const SubjectsPage = () => {

  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  const fetchSubjects = async () => {

    try {

      const { data } =
        await API.get("/subjects");

      setSubjects(data);

    } catch (error) {

      toast.error(
        "Failed to fetch subjects"
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchSubjects();

  }, []);




  const deleteSubject = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;



    try {

      await API.delete(
        `/subjects/${id}`
      );

      toast.success(
        "Subject deleted successfully"
      );

      fetchSubjects();

    } catch (error) {

      toast.error(
        "Failed to delete subject"
      );

    }

  };



  return (

    <AdminLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            Subjects

          </h1>

          <p className="text-gray-500 mt-1">

            Manage all subjects

          </p>

        </div>



        <Link
          to="/subjects/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >

          + Add Subject

        </Link>

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
                  Subject Name
                </th>

                <th className="text-left p-4">
                  Subject Code
                </th>

                <th className="text-left p-4">
                  Full Marks
                </th>

                <th className="text-left p-4">
                  Pass Marks
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>



            <tbody>

              {subjects.map((subject) => (

                <tr
                  key={subject._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {subject.subjectName}
                  </td>

                  <td className="p-4">
                    {subject.subjectCode}
                  </td>

                  <td className="p-4">
                    {subject.fullMarks}
                  </td>

                  <td className="p-4">
                    {subject.passMarks}
                  </td>



                  <td className="p-4 flex gap-3">

                    <Link
                      to={`/subjects/edit/${subject._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>



                    <button
                      onClick={() =>
                        deleteSubject(
                          subject._id
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

export default SubjectsPage;