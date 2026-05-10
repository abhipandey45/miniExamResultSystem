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

const SubjectFormPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] =
        useState({
            subjectName: "",
            subjectCode: "",
            fullMarks: "",
            passMarks: "",
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // fetch existing subject
    const fetchSubject = async () => {

        try {
            const { data } =
                await API.get(
                    `/subjects/${id}`
                );

            setFormData(data);

        } catch (error) {

            toast.error(
                "Failed to fetch subject"
            );
        }
    };

    useEffect(() => {

        if (isEditMode) {

            fetchSubject();

        }

    }, []);




    const handleSubmit = async (e) => {

        e.preventDefault();



        // frontend validation
        if (
            Number(formData.fullMarks) <=
            Number(formData.passMarks)
        ) {
            return toast.error(
                "Full marks must be greater than pass marks"
            );
        }
        try {
            setLoading(true);
            if (isEditMode) {
                await API.put(
                    `/subjects/${id}`,
                    formData
                );
                toast.success(
                    "Subject updated successfully"
                );
            } else {
                await API.post(
                    "/subjects",
                    formData
                );
                toast.success(
                    "Subject created successfully"
                );
            }
            navigate("/subjects");
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
                        ? "Edit Subject"
                        : "Add Subject"}
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <input
                        type="text"
                        name="subjectName"
                        placeholder="Subject Name"
                        value={formData.subjectName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl px-4 py-3"
                    />

                    <input
                        type="text"
                        name="subjectCode"
                        placeholder="Subject Code"
                        value={formData.subjectCode}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl px-4 py-3"
                    />



                    <input
                        type="number"
                        name="fullMarks"
                        placeholder="Full Marks"
                        value={formData.fullMarks}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl px-4 py-3"
                    />



                    <input
                        type="number"
                        name="passMarks"
                        placeholder="Pass Marks"
                        value={formData.passMarks}
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
                                    ? "Update Subject"
                                    : "Create Subject"}

                        </button>

                    </div>

                </form>

            </div>

        </AdminLayout>

    );

};

export default SubjectFormPage;