import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

import AdminLayout from "../../layouts/AdminLayout";



const StudentFormPage = () => {

  const navigate = useNavigate();

  const { id } = useParams();



  const isEditMode = Boolean(id);



  const [loading, setLoading] =
    useState(false);



  const [formData, setFormData] =
    useState({

      name: "",
      rollNumber: "",
      className: "",
      section: "",
      email: "",
      phone: "",

    });



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };



  // fetch existing student

  const fetchStudent = async () => {

    try {

      const { data } = await API.get(
        `/students/${id}`
      );

      setFormData(data);

    } catch (error) {

      toast.error(
        "Failed to fetch student"
      );

    }

  };



  useEffect(() => {

    if (isEditMode) {

      fetchStudent();

    }

  }, []);




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (isEditMode) {

        await API.put(
          `/students/${id}`,
          formData
        );

        toast.success(
          "Student updated successfully"
        );

      } else {

        await API.post(
          "/students",
          formData
        );

        toast.success(
          "Student created successfully"
        );

      }

      navigate("/students");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <AdminLayout>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">

          {isEditMode
            ? "Edit Student"
            : "Add Student"}

        </h1>



        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3"
          />



          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3"
          />



          <input
            type="text"
            name="className"
            placeholder="Class Name"
            value={formData.className}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3"
          />



          <input
            type="text"
            name="section"
            placeholder="Section"
            value={formData.section}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3"
          />



          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3"
          />



          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3"
          />



          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >

              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Student"
                : "Create Student"}

            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

};

export default StudentFormPage;