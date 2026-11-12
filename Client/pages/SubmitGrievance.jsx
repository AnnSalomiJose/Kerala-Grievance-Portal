
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SubmitGrievance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    district: "",
    category: "",
    subject: "",
    description: "",
  });

  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const districts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ];

  const categories = [
    "Health",
    "Education",
    "Police & Home Affairs",
    "Revenue",
    "Local Self Government",
    "Transport",
    "Water Resources",
    "Power & Electricity",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("district", formData.district);
      data.append("category", formData.category);
      data.append("subject", formData.subject);
      data.append("description", formData.description);

      if (attachment) {
        data.append("attachment", attachment);
      }

      const response = await axios.post(
        "http://localhost:5000/api/grievances/submit",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReferenceNumber(
        response.data.grievance.referenceNumber
      );

      setFormData({
        district: "",
        category: "",
        subject: "",
        description: "",
      });

      setAttachment(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to submit grievance. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (referenceNumber) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-green-700">
            Grievance Submitted Successfully!
          </h1>

          <p className="mt-4 text-gray-600">
            Your Reference Number:
          </p>

          <p className="mt-3 break-all rounded-lg bg-green-50 p-4 font-bold text-green-800">
            {referenceNumber}
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Please save this reference number to track your grievance.
          </p>

          <button
            onClick={() => navigate("/citizen/dashboard")}
            className="mt-6 rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-gray-800">
          Submit a Grievance
        </h1>

        <p className="mb-8 mt-2 text-gray-500">
          Provide the details of your complaint below.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-5">
            <label className="mb-2 block font-medium text-gray-700">
              District
            </label>

            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="">Select District</option>

              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="mb-2 block font-medium text-gray-700">
              Grievance Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="mb-2 block font-medium text-gray-700">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter grievance subject"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain your grievance in detail"
              rows="6"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Upload Image / Document (Optional)
            </label>

            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) =>
                setAttachment(e.target.files[0] || null)
              }
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            {attachment && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {attachment.name}
              </p>
            )}
          </div>

          {error && (
            <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Grievance"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/citizen/dashboard")}
              className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SubmitGrievance;
