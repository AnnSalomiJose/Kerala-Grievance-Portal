
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiLogOut,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";

function OfficerDashboard() {
  const navigate = useNavigate();

  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [updates, setUpdates] = useState({});

  const token = localStorage.getItem("token");

  const fetchAssignedGrievances = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/grievances/officer/assigned",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGrievances(response.data.grievances || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load assigned grievances."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchAssignedGrievances();
  }, []);

  const handleUpdateChange = (id, field, value) => {
    setUpdates((previous) => ({
      ...previous,
      [id]: {
        ...previous[id],
        [field]: value,
      },
    }));
  };

  const handleSubmitUpdate = async (id) => {
    const update = updates[id] || {};

    if (!update.status || !update.remarks?.trim()) {
      setError("Please select a status and enter remarks.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      await axios.patch(
        `http://localhost:5000/api/grievances/${id}/officer-update`,
        {
          status: update.status,
          remarks: update.remarks,
          actionTakenReport: update.actionTakenReport || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Grievance updated successfully.");
      setUpdates((previous) => ({
        ...previous,
        [id]: {},
      }));

      fetchAssignedGrievances();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update grievance."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const getStatusStyle = (status) => {
    const styles = {
      Submitted: "bg-blue-100 text-blue-700",
      "Under Review": "bg-yellow-100 text-yellow-700",
      "In Progress": "bg-purple-100 text-purple-700",
      Resolved: "bg-green-100 text-green-700",
      Reopened: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-xl bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Department Officer Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome, {user.name || "Officer"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchAssignedGrievances}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              <FiRefreshCw />
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Assigned Grievances</p>
              <FiFileText className="text-2xl text-blue-600" />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-800">
              {grievances.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Pending</p>
              <FiClock className="text-2xl text-yellow-600" />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-800">
              {
                grievances.filter(
                  (item) => item.status !== "Resolved"
                ).length
              }
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Resolved</p>
              <FiCheckCircle className="text-2xl text-green-600" />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-800">
              {
                grievances.filter(
                  (item) => item.status === "Resolved"
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-lg bg-red-100 p-4 text-red-700">
            <FiAlertCircle />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg bg-green-100 p-4 text-green-700">
            {success}
          </div>
        )}

        {/* Grievance List */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Assigned Grievances
          </h2>

          {loading ? (
            <p className="py-8 text-center text-gray-500">
              Loading grievances...
            </p>
          ) : grievances.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No grievances assigned to you yet.
            </p>
          ) : (
            <div className="space-y-6">
              {grievances.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <p className="text-sm text-gray-500">
                        Reference Number
                      </p>
                      <h3 className="font-bold text-blue-700">
                        {item.referenceNumber}
                      </h3>
                    </div>

                    <span
                      className={`h-fit rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <p>
                      <strong>Subject:</strong> {item.subject}
                    </p>
                    <p>
                      <strong>District:</strong> {item.district}
                    </p>
                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>
                    <p>
                      <strong>Priority:</strong> {item.priority}
                    </p>
                    <p>
                      <strong>Citizen:</strong>{" "}
                      {item.citizen?.name || "Citizen"}
                    </p>
                    <p>
                      <strong>Department:</strong>{" "}
                      {item.assignedDepartment || "Not specified"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 font-semibold text-gray-700">
                      Description
                    </p>
                    <p className="text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  {item.attachments?.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 font-semibold text-gray-700">
                        Attachments
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {item.attachments.map((file, index) => (
                          <a
                            key={index}
                            href={`http://localhost:5000${file.path}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-600 underline"
                          >
                            {file.filename}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 border-t border-gray-200 pt-5">
                    <h4 className="mb-4 font-semibold text-gray-800">
                      Update Grievance
                    </h4>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Update Status
                        </label>

                        <select
                          value={updates[item._id]?.status || ""}
                          onChange={(e) =>
                            handleUpdateChange(
                              item._id,
                              "status",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                        >
                          <option value="">Select status</option>
                          <option value="Under Review">Under Review</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Reopened">Reopened</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Remarks
                        </label>

                        <textarea
                          rows="3"
                          value={updates[item._id]?.remarks || ""}
                          onChange={(e) =>
                            handleUpdateChange(
                              item._id,
                              "remarks",
                              e.target.value
                            )
                          }
                          placeholder="Enter your remarks..."
                          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium">
                        Action Taken Report
                      </label>

                      <textarea
                        rows="3"
                        value={
                          updates[item._id]?.actionTakenReport || ""
                        }
                        onChange={(e) =>
                          handleUpdateChange(
                            item._id,
                            "actionTakenReport",
                            e.target.value
                          )
                        }
                        placeholder="Describe the action taken by your department..."
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      onClick={() => handleSubmitUpdate(item._id)}
                      className="mt-4 rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
                    >
                      Submit Update to CMO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfficerDashboard;
