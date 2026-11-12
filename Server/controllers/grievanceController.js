
const Grievance = require("../models/Grievance");
const User = require("../models/User");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Generate Reference Number
const generateReferenceNumber = () => {
  const uniqueId = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `CMK-${Date.now()}-${uniqueId}`;
};

// Submit Grievance
const submitGrievance = async (req, res) => {
  try {
    const { district, category, subject, description } = req.body;

    if (!district || !category || !subject || !description) {
      return res.status(400).json({
        message: "Please provide all required grievance details.",
      });
    }

    const attachments = req.file
      ? [{
          filename: req.file.filename,
          path: `/uploads/${req.file.filename}`,
          mimetype: req.file.mimetype,
        }]
      : [];

    const grievance = new Grievance({
      referenceNumber: generateReferenceNumber(),
      citizen: req.user.id,
      district,
      category,
      subject,
      description,
      attachments,
      history: [{
        status: "Submitted",
        remarks: "Grievance submitted by citizen",
        changedBy: req.user.id,
      }],
    });

    await grievance.save();

    return res.status(201).json({
      message: "Grievance submitted successfully.",
      grievance,
    });
  } catch (error) {
    console.error("Submit Grievance Error:", error);
    return res.status(500).json({
      message: "Failed to submit grievance.",
    });
  }
};

// Get Citizen's Own Grievances
const getMyGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({
      citizen: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Grievances fetched successfully.",
      total: grievances.length,
      grievances,
    });
  } catch (error) {
    console.error("Get My Grievances Error:", error);
    return res.status(500).json({
      message: "Failed to fetch grievances.",
    });
  }
};

// CMO Dashboard
const getCMODashboard = async (req, res) => {
  try {
    if (!["cmo", "admin"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. CMO permission required.",
      });
    }

    const { district, category, status, priority } = req.query;
    const filters = {};

    if (district) filters.district = district;
    if (category) filters.category = category;
    if (status) filters.status = status;
    if (priority) filters.priority = priority;

    const overdueDate = new Date();
    overdueDate.setDate(overdueDate.getDate() - 7);

    const [
      total,
      pending,
      resolved,
      overdue,
      grievances,
      districtChart,
      departmentChart,
      statusChart,
    ] = await Promise.all([
      Grievance.countDocuments(),

      Grievance.countDocuments({
        status: { $ne: "Resolved" },
      }),

      Grievance.countDocuments({
        status: "Resolved",
      }),

      Grievance.countDocuments({
        status: { $ne: "Resolved" },
        createdAt: { $lt: overdueDate },
      }),

      Grievance.find(filters)
        .populate("citizen", "name email mobile")
        .populate("assignedOfficer", "name email")
        .sort({ createdAt: -1 }),

      Grievance.aggregate([
        {
          $group: {
            _id: "$district",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),

      Grievance.aggregate([
        {
          $group: {
            _id: {
              $ifNull: ["$assignedDepartment", "Not Assigned"],
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),

      Grievance.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
    ]);

    return res.status(200).json({
      message: "CMO dashboard data fetched successfully.",
      statistics: {
        total,
        pending,
        resolved,
        overdue,
      },
      chartData: {
        districtChart: districtChart.map((item) => ({
          district: item._id,
          count: item.count,
        })),
        departmentChart: departmentChart.map((item) => ({
          department: item._id,
          count: item.count,
        })),
        statusChart: statusChart.map((item) => ({
          status: item._id,
          count: item.count,
        })),
      },
      grievances,
    });
  } catch (error) {
    console.error("CMO Dashboard Error:", error);
    return res.status(500).json({
      message: "Failed to fetch CMO dashboard data.",
    });
  }
};

// Get All Department Officers
const getOfficers = async (req, res) => {
  try {
    if (!["cmo", "admin"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    const officers = await User.find({
      role: "officer",
    }).select("name email");

    return res.status(200).json({
      message: "Officers fetched successfully.",
      officers,
    });
  } catch (error) {
    console.error("Get Officers Error:", error);
    return res.status(500).json({
      message: "Failed to fetch officers.",
    });
  }
};

// Assign Grievance to Department Officer
const assignGrievance = async (req, res) => {
  try {
    if (!["cmo", "admin"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid grievance ID.",
      });
    }

    const { department, officerId } = req.body;

    if (!department || !officerId) {
      return res.status(400).json({
        message: "Department and officer are required.",
      });
    }

    if (!mongoose.isValidObjectId(officerId)) {
      return res.status(400).json({
        message: "Invalid officer ID.",
      });
    }

    const officer = await User.findOne({
      _id: officerId,
      role: "officer",
    });

    if (!officer) {
      return res.status(404).json({
        message: "Officer not found.",
      });
    }

    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({
        message: "Grievance not found.",
      });
    }

    grievance.assignedDepartment = department;
    grievance.assignedOfficer = officerId;
    grievance.status = "In Progress";

    grievance.history.push({
      status: "In Progress",
      remarks: `Assigned to ${department} department officer.`,
      changedBy: req.user.id,
    });

    await grievance.save();

    return res.status(200).json({
      message: "Grievance assigned successfully.",
      grievance,
    });
  } catch (error) {
    console.error("Assign Grievance Error:", error);
    return res.status(500).json({
      message: "Failed to assign grievance.",
    });
  }
};

// Update Grievance Status (CMO/Admin)
const updateGrievanceStatus = async (req, res) => {
  try {
    if (!["cmo", "admin"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. CMO permission required.",
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid grievance ID.",
      });
    }

    const { status, remarks } = req.body;

    const allowedStatuses = [
      "Submitted",
      "Under Review",
      "In Progress",
      "Resolved",
      "Reopened",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid grievance status.",
      });
    }

    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({
        message: "Grievance not found.",
      });
    }

    grievance.status = status;

    grievance.history.push({
      status,
      remarks: remarks || `Status updated to ${status}`,
      changedBy: req.user.id,
    });

    await grievance.save();

    return res.status(200).json({
      message: "Grievance status updated successfully.",
      grievance,
    });
  } catch (error) {
    console.error("Update Grievance Status Error:", error);
    return res.status(500).json({
      message: "Failed to update grievance status.",
    });
  }
};

// Submit Citizen Feedback
const submitFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;

    const numericRating = Number(rating);

    if (
      rating === undefined ||
      rating === null ||
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message: "Please provide a rating between 1 and 5.",
      });
    }

    const grievance = await Grievance.findOne({
      _id: req.params.id,
      citizen: req.user.id,
    });

    if (!grievance) {
      return res.status(404).json({
        message: "Grievance not found.",
      });
    }

    if (grievance.status !== "Resolved") {
      return res.status(400).json({
        message: "Feedback can be submitted only for resolved grievances.",
      });
    }

    if (grievance.feedback && grievance.feedback.rating) {
      return res.status(400).json({
        message: "Feedback has already been submitted.",
      });
    }

    grievance.feedback = {
      rating: numericRating,
      comments: typeof comments === "string" ? comments.trim() : "",
    };

    await grievance.save();

    return res.status(200).json({
      message: "Feedback submitted successfully.",
      feedback: grievance.feedback,
    });
  } catch (error) {
    console.error("Submit Feedback Error:", error);
    return res.status(500).json({
      message: "Failed to submit feedback.",
    });
  }
};

// Get Grievances Assigned to Department Officer
const getOfficerAssignedGrievances = async (req, res) => {
  try {
    if (req.user.role !== "officer") {
      return res.status(403).json({
        message: "Access denied. Officer permission required.",
      });
    }

    const grievances = await Grievance.find({
      assignedOfficer: req.user.id,
    })
      .populate("citizen", "name email mobile")
      .populate("assignedOfficer", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Assigned grievances fetched successfully.",
      total: grievances.length,
      grievances,
    });
  } catch (error) {
    console.error("Officer Assigned Grievances Error:", error);
    return res.status(500).json({
      message: "Failed to fetch assigned grievances.",
    });
  }
};

// Officer Updates Assigned Grievance
const officerUpdateGrievance = async (req, res) => {
  try {
    if (req.user.role !== "officer") {
      return res.status(403).json({
        message: "Access denied. Officer permission required.",
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid grievance ID.",
      });
    }

    const { status, remarks, actionTakenReport } = req.body;

    const allowedStatuses = [
      "Under Review",
      "In Progress",
      "Resolved",
      "Reopened",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid grievance status.",
      });
    }

    if (!remarks || !remarks.trim()) {
      return res.status(400).json({
        message: "Please provide remarks.",
      });
    }

    const grievance = await Grievance.findOne({
      _id: req.params.id,
      assignedOfficer: req.user.id,
    });

    if (!grievance) {
      return res.status(404).json({
        message: "Assigned grievance not found.",
      });
    }

    grievance.status = status;

    grievance.history.push({
      status,
      remarks: remarks.trim(),
      changedBy: req.user.id,
    });

    if (actionTakenReport !== undefined) {
      grievance.actionTakenReport =
        typeof actionTakenReport === "string"
          ? actionTakenReport.trim()
          : "";
    }

    await grievance.save();

    return res.status(200).json({
      message: "Grievance updated successfully.",
      grievance,
    });
  } catch (error) {
    console.error("Officer Update Grievance Error:", error);
    return res.status(500).json({
      message: "Failed to update grievance.",
    });
  }
};

// Export All Controller Functions
module.exports = {
  submitGrievance,
  getMyGrievances,
  getCMODashboard,
  getOfficers,
  assignGrievance,
  updateGrievanceStatus,
  submitFeedback,
  getOfficerAssignedGrievances,
  officerUpdateGrievance,
};
