
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiLogOut,
  FiUserPlus,
} from "react-icons/fi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function CMODashboard() {
  const navigate = useNavigate();

  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    overdue: 0,
  });

  const [chartData, setChartData] = useState({
    districtChart: [],
    departmentChart: [],
    statusChart: [],
  });

  const [grievances, setGrievances] = useState([]);
  const [officers, setOfficers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [assigningId, setAssigningId] = useState("");

  const [filters, setFilters] = useState({
    district: "",
    category: "",
    status: "",
    priority: "",
  });

  const [assignmentData, setAssignmentData] = useState({});

  const departments = [
    "Health",
    "Education",
    "Transport",
    "Revenue",
    "Police",
    "Water Resources",
    "Electricity",
    "Local Self Government",
    "Other",
  ];

  const chartColors = [
    "#2563eb",
    "#16a34a",
    "#eab308",
    "#9333ea",
    "#f97316",
    "#0891b2",
  ];

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // Fetch CMO Dashboard Data
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/grievances/cmo/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filters,
        }
      );

      setStatistics(response.data.statistics || {
        total: 0,
        pending: 0,
        resolved: 0,
        overdue: 0,
      });

      setGrievances(response.data.grievances || []);

      setChartData(response.data.chartData || {
        districtChart: [],
        departmentChart: [],
        statusChart: [],
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load CMO dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch Officers
  const fetchOfficers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/grievances/officers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOfficers(response.data.officers || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch department officers."
      );
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [filters]);

  // Filter Change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Assignment Field Change
  const handleAssignmentChange = (grievanceId, field, value) => {
    setAssignmentData((previous) => ({
      ...previous,
      [grievanceId]: {
        ...previous[grievanceId],
        [field]: value,
      },
    }));
  };

  // Assign Grievance
  const handleAssign = async (grievanceId) => {
    try {
      setError("");
      setSuccess("");

      const selectedData = assignmentData[grievanceId];

      if (!selectedData?.department || !selectedData?.officerId) {
        setError("Please select both department and officer.");
        return;
      }

      const token = localStorage.getItem("token");

      setAssigningId(grievanceId);

      const response = await axios.patch(
        `http://localhost:5000/api/grievances/${grievanceId}/assign`,
        {
          department: selectedData.department,
          officerId: selectedData.officerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        response.data.message || "Grievance assigned successfully."
      );

      await fetchDashboard();

      setAssignmentData((previous) => ({
        ...previous,
        [grievanceId]: {
          department: selectedData.department,
          officerId: selectedData.officerId,
        },
      }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to assign grievance."
      );
    } finally {
      setAssigningId("");
    }
  };

  // Statistics Cards
  const statCards = [
    {
      title: "Total Grievances",
      value: statistics.total,
      icon: <FiFileText />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Pending",
      value: statistics.pending,
      icon: <FiClock />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Resolved",
      value: statistics.resolved,
      icon: <FiCheckCircle />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Overdue",
      value: statistics.overdue,
      icon: <FiAlertCircle />,
      color: "bg-red-100 text-red-700",
    },
  ];

  // Status Styles
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading CMO Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              CMO Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Monitor and manage public grievances
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchDashboard}
              className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-white hover:bg-blue-800"
            >
              <FiRefreshCw />
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-700"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
            {success}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-800">
                    {card.value}
                  </h2>
                </div>

                <div className={`rounded-full p-4 text-2xl ${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="mb-5 text-2xl font-bold text-gray-800">
            Grievance Analytics
          </h2>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* District Chart */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-gray-800">
                District-wise Grievances
              </h3>

              {chartData.districtChart.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={chartData.districtChart}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 0,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="district"
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                      height={80}
                      tick={{ fontSize: 11 }}
                    />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      name="Grievances"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="py-20 text-center text-gray-400">
                  No district data available.
                </p>
              )}
            </div>

            {/* Department Chart */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-gray-800">
                Department-wise Grievances
              </h3>

              {chartData.departmentChart.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={chartData.departmentChart}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 20,
                      left: 35,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      type="number"
                      allowDecimals={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="department"
                      width={130}
                      tick={{ fontSize: 11 }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      name="Grievances"
                      fill="#16a34a"
                      radius={[0, 6, 6, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="py-20 text-center text-gray-400">
                  No department data available.
                </p>
              )}
            </div>

            {/* Status Chart */}
            <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
              <h3 className="mb-5 text-lg font-semibold text-gray-800">
                Status-wise Grievances
              </h3>

              {chartData.statusChart.length > 0 ? (
                <div className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={chartData.statusChart}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {chartData.statusChart.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={chartColors[index % chartColors.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />

                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="py-20 text-center text-gray-400">
                  No status data available.
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Filter Grievances
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 p-3"
            >
              <option value="">All Districts</option>

              {[
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
              ].map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 p-3"
            >
              <option value="">All Categories</option>

              {departments.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 p-3"
            >
              <option value="">All Statuses</option>

              {[
                "Submitted",
                "Under Review",
                "In Progress",
                "Resolved",
                "Reopened",
              ].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 p-3"
            >
              <option value="">All Priorities</option>

              {["Low", "Medium", "High"].map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Grievance Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

          <div className="border-b p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              All Grievances ({grievances.length})
            </h2>
          </div>

          {grievances.length === 0 ? (
            <p className="p-8 text-center text-gray-500">
              No grievances found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1500px] text-left">

                <thead className="bg-gray-50 text-sm text-gray-600">
                  <tr>
                    <th className="p-4">Reference ID</th>
                    <th className="p-4">Citizen</th>
                    <th className="p-4">District</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Attachment</th>
                    <th className="p-4">Assigned Department</th>
                    <th className="p-4">Assign Officer</th>
                  </tr>
                </thead>

                <tbody>
                  {grievances.map((item) => {
                    const selectedData = assignmentData[item._id] || {};

                    return (
                      <tr
                        key={item._id}
                        className="border-t align-top hover:bg-gray-50"
                      >
                        <td className="p-4 font-medium text-blue-700">
                          {item.referenceNumber}
                        </td>

                        <td className="p-4">
                          {item.citizen?.name || "N/A"}
                        </td>

                        <td className="p-4">
                          {item.district}
                        </td>

                        <td className="p-4">
                          {item.category}
                        </td>

                        <td className="max-w-xs p-4">
                          {item.subject}
                        </td>

                        <td className="p-4">
                          {item.priority}
                        </td>

                        <td className="p-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap p-4">
                          {new Date(item.createdAt).toLocaleDateString("en-IN")}
                        </td>

                        <td className="p-4">
                          {item.attachments?.length > 0 ? (
                            <a
                              href={`http://localhost:5000${item.attachments[0].path}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-blue-700 hover:underline"
                            >
                              View File
                            </a>
                          ) : (
                            <span className="text-gray-400">
                              No file
                            </span>
                          )}
                        </td>

                        {/* Department Selection */}
                        <td className="p-4">
                          <select
                            value={
                              selectedData.department ??
                              item.assignedDepartment ??
                              ""
                            }
                            onChange={(e) =>
                              handleAssignmentChange(
                                item._id,
                                "department",
                                e.target.value
                              )
                            }
                            className="w-48 rounded-lg border border-gray-300 p-2"
                          >
                            <option value="">Select Department</option>

                            {departments.map((department) => (
                              <option key={department} value={department}>
                                {department}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Officer Selection and Assign */}
                        <td className="p-4">
                          <div className="flex min-w-64 flex-col gap-2">

                            <select
                              value={
                                selectedData.officerId ??
                                item.assignedOfficer?._id ??
                                ""
                              }
                              onChange={(e) =>
                                handleAssignmentChange(
                                  item._id,
                                  "officerId",
                                  e.target.value
                                )
                              }
                              className="w-64 rounded-lg border border-gray-300 p-2"
                            >
                              <option value="">Select Officer</option>

                              {officers.map((officer) => (
                                <option
                                  key={officer._id}
                                  value={officer._id}
                                >
                                  {officer.name} ({officer.email})
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={() => handleAssign(item._id)}
                              disabled={assigningId === item._id}
                              className="flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <FiUserPlus />

                              {assigningId === item._id
                                ? "Assigning..."
                                : "Assign"}
                            </button>

                            {item.assignedOfficer && (
                              <p className="text-xs text-green-700">
                                Currently assigned to:{" "}
                                {item.assignedOfficer.name}
                              </p>
                            )}

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default CMODashboard;
