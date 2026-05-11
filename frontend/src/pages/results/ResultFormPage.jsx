import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const ResultFormPage = () => {

  const navigate = useNavigate();



  const [students, setStudents] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);



  const [formData, setFormData] =
    useState({

      studentId: "",

      examName: "",

      subjects: [],

    });



  // fetch students & subjects

  const fetchData = async () => {

    try {

      const studentRes =
        await API.get("/students");

      const subjectRes =
        await API.get("/subjects");



      setStudents(studentRes.data);

      setSubjects(subjectRes.data);



      // initialize subjects array

      setFormData((prev) => ({

        ...prev,

        subjects:
          subjectRes.data.map(
            (subject) => ({

              subjectId:
                subject._id,

              marksObtained: "",

            })
          ),

      }));

    } catch (error) {

      toast.error(
        "Failed to load form data"
      );

    }

  };



  useEffect(() => {

    fetchData();

  }, []);




  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };



  const handleMarksChange = (
    index,
    value
  ) => {

    const updatedSubjects = [
      ...formData.subjects,
    ];



    updatedSubjects[index]
      .marksObtained = value;



    setFormData({

      ...formData,

      subjects: updatedSubjects,

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);



      await API.post(
        "/results",
        formData
      );



      toast.success(
        "Result created successfully"
      );



      navigate("/results");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to create result"
      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <AdminLayout>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">

          Create Result

        </h1>



        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* STUDENT */}

          <div>

            <label className="block mb-2 font-medium">

              Select Student

            </label>



            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            >

              <option value="">
                Choose student
              </option>



              {students.map((student) => (

                <option
                  key={student._id}
                  value={student._id}
                >

                  {student.name} (
                  {
                    student.rollNumber
                  }
                  )

                </option>

              ))}

            </select>

          </div>



          {/* EXAM */}

          <div>

            <label className="block mb-2 font-medium">

              Exam Name

            </label>



            <input
              type="text"
              name="examName"
              placeholder="Example: Mid Term"
              value={formData.examName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

          </div>



          {/* SUBJECT MARKS */}

          <div>

            <h2 className="text-2xl font-bold mb-4">

              Subject Marks

            </h2>



            <div className="space-y-4">

              {subjects.map(
                (subject, index) => (

                  <div
                    key={subject._id}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >

                    <div className="bg-slate-100 px-4 py-3 rounded-xl">

                      {subject.subjectName}
                      {" "}
                      (
                      Full:
                      {" "}
                      {
                        subject.fullMarks
                      }
                      )

                    </div>



                    <input
                      type="number"
                      placeholder="Enter marks"
                      value={
                        formData.subjects[
                          index
                        ]
                          ?.marksObtained
                      }
                      onChange={(e) =>
                        handleMarksChange(
                          index,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-xl px-4 py-3"
                    />

                  </div>

                )
              )}

            </div>

          </div>



          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >

            {loading
              ? "Creating..."
              : "Create Result"}

          </button>

        </form>

      </div>

    </AdminLayout>

  );

};

export default ResultFormPage;