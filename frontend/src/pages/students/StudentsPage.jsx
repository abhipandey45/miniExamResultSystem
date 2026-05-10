import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

import AdminLayout from "../../layouts/AdminLayout";



const StudentsPage = () => {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");



  const fetchStudents = async () => {

    try {

      const { data } = await API.get(
        `/students?search=${search}`
      );

      setStudents(data);

    } catch (error) {

      toast.error(
        "Failed to fetch students"
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchStudents();

  }, [search]);



  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;



    try {

      await API.delete(`/students/${id}`);

      toast.success(
        "Student deleted successfully"
      );

      fetchStudents();

    } catch (error) {

      toast.error(
        "Failed to delete student"
      );

    }

  };



  return (

    <AdminLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            Students

          </h1>

          <p className="text-gray-500 mt-1">

            Manage all students

          </p>

        </div>



        <Link
          to="/students/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >

          + Add Student

        </Link>

      </div>



      {/* SEARCH */}

      <div className="mb-5">

        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                  Name
                </th>

                <th className="text-left p-4">
                  Roll No
                </th>

                <th className="text-left p-4">
                  Class
                </th>

                <th className="text-left p-4">
                  Section
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>



            <tbody>

              {students.map((student) => (

                <tr
                  key={student._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {student.name}
                  </td>

                  <td className="p-4">
                    {student.rollNumber}
                  </td>

                  <td className="p-4">
                    {student.className}
                  </td>

                  <td className="p-4">
                    {student.section}
                  </td>

                  <td className="p-4">
                    {student.email}
                  </td>



                  <td className="p-4 flex gap-3">

                    <Link
                      to={`/students/edit/${student._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>



                    <button
                      onClick={() =>
                        deleteStudent(
                          student._id
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

export default StudentsPage;