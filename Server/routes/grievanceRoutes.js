
const express = require("express");
const router = express.Router();

const {
  submitGrievance,
  getMyGrievances,
  getCMODashboard,
  updateGrievanceStatus,
  getOfficers,
  assignGrievance,
  getOfficerAssignedGrievances,
  officerUpdateGrievance,
  submitFeedback,
} = require("../controllers/grievanceController");

const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images, PDF and Word documents are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Submit Grievance
router.post(
  "/submit",
  authMiddleware,
  upload.single("attachment"),
  submitGrievance
);

// Get Citizen's Own Grievances
router.get(
  "/my-grievances",
  authMiddleware,
  getMyGrievances
);

// CMO Dashboard
router.get(
  "/cmo/dashboard",
  authMiddleware,
  getCMODashboard
);

// Get All Department Officers
router.get(
  "/officers",
  authMiddleware,
  getOfficers
);

// Assign Grievance to Department Officer
router.patch(
  "/:id/assign",
  authMiddleware,
  assignGrievance
);

// Update Grievance Status (CMO/Admin)
router.put(
  "/:id/status",
  authMiddleware,
  updateGrievanceStatus
);

// Get grievances assigned to Officer
router.get(
  "/officer/assigned",
  authMiddleware,
  getOfficerAssignedGrievances
);

// Officer updates assigned grievance
router.patch(
  "/:id/officer-update",
  authMiddleware,
  officerUpdateGrievance
);

// Citizen submits feedback
router.post(
  "/:id/feedback",
  authMiddleware,
  submitFeedback
);

module.exports = router;
