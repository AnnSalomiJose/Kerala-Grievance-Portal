
const mongoose = require("mongoose");

// Grievance History Schema
const grievanceHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
      default: "",
    },

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// Grievance Schema
const grievanceSchema = new mongoose.Schema(
  {
    // Reference Number
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // Citizen Details
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // District
    district: {
      type: String,
      required: true,
      trim: true,
    },

    // Category
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // Subject
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    // Description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Attachments
    attachments: [
      {
        filename: String,
        path: String,
        mimetype: String,
      },
    ],

    // Grievance Status
    status: {
      type: String,
      enum: [
        "Submitted",
        "Under Review",
        "In Progress",
        "Resolved",
        "Reopened",
      ],
      default: "Submitted",
    },

    // Priority
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // Assigned Department
    assignedDepartment: {
      type: String,
      default: "",
    },

    // Assigned Officer
    assignedOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // Action Taken Report
actionTakenReport: {
  type: String,
  default: "",
},

    // AI Analysis
    aiAnalysis: {
      suggestedDepartment: String,
      suggestedCategory: String,
      suggestedPriority: String,
      summary: String,
    },

    // Grievance Status History
    history: {
      type: [grievanceHistorySchema],
      default: [],
    },
    

    // Citizen Feedback
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },

      comments: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create Grievance Model
const Grievance = mongoose.model("Grievance", grievanceSchema);

module.exports = Grievance;
