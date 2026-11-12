
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiFileText,
  FiPlusCircle,
  FiSearch,
  FiLogOut,
  FiUser,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

function CitizenDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchGrievances = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/grievances/my-grievances",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setGrievances(response.data.grievances || []);
      } catch (error) {
        console.error("Unable to fetch grievances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const totalGrievances = grievances.length;

  const pendingGrievances = grievances.filter(
    (item) => item.status !== "Resolved"
  ).length;

  const resolvedGrievances = grievances.filter(
    (item) => item.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-4">

          <div>
            <h1 className="text-2xl font-bold">
              Citizen Dashboard
            </h1>
            <p className="text-blue-100 mt-1">
              CM Kerala Public Grievance Redressal Portal
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-blue-800 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-100"
          >
            <FiLogOut />
            Logout
          </button>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {user.name || "Citizen"}!
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your grievances and track their progress here.
          </p>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">

          <div className="flex items-center gap-3 mb-5">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
              <FiUser size={24} />
            </div>

            <h3 className="text-lg font-bold text-gray-800">
              My Profile
            </h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">

            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-gray-800 mt-1">
                {user.name || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800 mt-1">
                {user.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-semibold text-gray-800 mt-1">
                {user.mobile || "Not available"}
              </p>
            </div>

          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Grievances</p>
                <h3 className="text-3xl font-bold text-blue-700 mt-2">
                  {loading ? "..." : totalGrievances}
                </h3>
              </div>

              <FiFileText className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Pending Grievances</p>
                <h3 className="text-3xl font-bold text-yellow-600 mt-2">
                  {loading ? "..." : pendingGrievances}
                </h3>
              </div>

              <FiClock className="text-yellow-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Resolved Grievances</p>
                <h3 className="text-3xl font-bold text-green-600 mt-2">
                  {loading ? "..." : resolvedGrievances}
                </h3>
              </div>

              <FiCheckCircle className="text-green-600" size={32} />
            </div>
          </div>

        </div>

        {/* Action Cards */}
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Grievance Services
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Submit Grievance */}
          <div className="bg-white rounded-xl shadow-sm p-7 border border-gray-100">

            <div className="bg-blue-100 text-blue-700 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <FiPlusCircle size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Submit a Grievance
            </h3>

            <p className="text-gray-500 mt-3 leading-7">
              Submit your complaints or grievances related to public services.
              You can attach supporting documents or images.
            </p>

            <button
              onClick={() => navigate("/citizen/submit-grievance")}
              className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
            >
              Submit Now
            </button>

          </div>

          {/* Track Grievances */}
          <div className="bg-white rounded-xl shadow-sm p-7 border border-gray-100">

            <div className="bg-green-100 text-green-700 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <FiSearch size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Track My Grievances
            </h3>

            <p className="text-gray-500 mt-3 leading-7">
              View your submitted grievances, reference numbers, current
              status and status history.
            </p>

            <button
              onClick={() => navigate("/citizen/my-grievances")}
              className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800"
            >
              Track Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CitizenDashboard;
