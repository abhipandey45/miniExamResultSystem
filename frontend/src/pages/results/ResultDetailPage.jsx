import {
  useEffect,
  useState,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const ResultDetailPage = () => {
  const { id } = useParams();
  const pdfRef = useRef();
  const [result, setResult] = useState(null);

// Fetch Result
  const fetchResult = async () => {

    try {
      const { data } =
        await API.get(
          `/results/${id}`
        );
      setResult(data);

    } catch (error) {
      toast.error(
        "Failed to fetch result"
      );
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);


// Download PDF
  const downloadPDF = async () => {

    try {
      const input = pdfRef.current;

      if (!input) {

        toast.error(
          "PDF content not found"
        );
        return;
      }

      const canvas =
        await html2canvas(input, {
          scale: 2,
          useCORS: true,
        });

      const imgData =
        canvas.toDataURL(
          "image/png"
        );

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height *
          pdfWidth) /
        canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      const studentName =
        result?.studentId?.name ||
        "student-result";

      pdf.save(
        `${studentName}.pdf`
      );

      toast.success(
        "PDF downloaded successfully"
      );

    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to generate PDF"
      );
    }
  };


// Loading

  if (!result) {

    return (
      <div className="flex justify-center items-center h-screen">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }




  return (

    <AdminLayout>

      {/* PDF BUTTON */}

      <div className="mb-5">

        <button
          onClick={downloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl">
          Download PDF
        </button>

      </div>



      {/* RESULT CONTENT */}

      <div
        ref={pdfRef}
        style={{
          backgroundColor: "#ffffff",
          padding: "32px",
          borderRadius: "16px",
          color: "#000000",
        }}
      >

        <h1
          className="text-4xl font-bold mb-8"
          style={{
            color: "#1e293b",
          }}
        >
          Result Details
        </h1>



        {/* STUDENT DETAILS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div>

            <p
              className="font-semibold"
              style={{
                color: "#475569",
              }}
            >
              Student Name
            </p>

            <p className="text-lg">
              {
                result.studentId
                  ?.name
              }
            </p>

          </div>

          <div>

            <p
              className="font-semibold"
              style={{
                color: "#475569",
              }}
            >
              Roll Number
            </p>

            <p className="text-lg">

              {
                result.studentId
                  ?.rollNumber
              }

            </p>

          </div>

          <div>
            <p
              className="font-semibold"
              style={{
                color: "#475569",
              }}
            >
              Class
            </p>

            <p className="text-lg">

              {
                result.studentId
                  ?.className
              }

            </p>

          </div>



          <div>

            <p
              className="font-semibold"
              style={{
                color: "#475569",
              }}
            >

              Section

            </p>

            <p className="text-lg">

              {
                result.studentId
                  ?.section
              }

            </p>

          </div>



          <div>

            <p
              className="font-semibold"
              style={{
                color: "#475569",
              }}
            >

              Exam Name

            </p>

            <p className="text-lg">

              {result.examName}

            </p>

          </div>



          <div>

            <p
              className="font-semibold"
              style={{
                color: "#475569",
              }}
            >

              Percentage

            </p>

            <p className="text-lg">

              {Number(
                result.percentage
              ).toFixed(2)}
              %

            </p>

          </div>



          <div>

            <p
              className="font-semibold"
              style={{
                color: "#475569",
              }}
            >

              Grade

            </p>

            <p className="text-lg">

              {result.grade}

            </p>

          </div>



          <div>

            <p
              className="font-semibold"
              style={{
                color: "#475569",
              }}
            >

              Status

            </p>

            <p
              className="text-lg font-bold"
              style={{
                color:
                  result.status ===
                  "Pass"

                    ? "#16a34a"

                    : "#dc2626",
              }}
            >

              {result.status}

            </p>

          </div>

        </div>



        {/* SUBJECT TABLE */}

        <div className="overflow-x-auto">

          <table
            style={{
              width: "100%",
              border:
                "1px solid #e5e7eb",
              borderCollapse:
                "collapse",
            }}
          >

            <thead
              style={{
                backgroundColor:
                  "#f1f5f9",
              }}
            >

              <tr>

                <th
                  className="p-4 text-left"
                  style={{
                    border:
                      "1px solid #e5e7eb",
                  }}
                >

                  Subject

                </th>

                <th
                  className="p-4 text-left"
                  style={{
                    border:
                      "1px solid #e5e7eb",
                  }}
                >

                  Marks Obtained

                </th>

              </tr>

            </thead>



            <tbody>

              {result.subjects.map(
                (subject) => (

                  <tr
                    key={subject._id}
                  >

                    <td
                      className="p-4"
                      style={{
                        border:
                          "1px solid #e5e7eb",
                      }}
                    >

                      {
                        subject
                          .subjectId
                          ?.subjectName
                      }

                    </td>



                    <td
                      className="p-4"
                      style={{
                        border:
                          "1px solid #e5e7eb",
                      }}
                    >

                      {
                        subject.marksObtained
                      }

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

};

export default ResultDetailPage;