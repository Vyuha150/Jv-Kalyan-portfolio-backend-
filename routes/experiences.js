const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  softDeleteExperience,
} = require("../controllers/experiencesController");
const { authMiddleware } = require("../middleware/authMiddleware");

// GET /api/experiences - Get all experiences
router.get("/", getAllExperiences);

// GET /api/experiences/:id - Get a single experience
router.get("/:id", getExperienceById);

// POST /api/experiences - Create a new experience (with image upload)
router.post("/", authMiddleware, upload.single("image"), createExperience);

// PUT /api/experiences/:id - Update an experience (with optional image upload)
router.put("/:id", authMiddleware, upload.single("image"), updateExperience);

// DELETE /api/experiences/:id - Delete an experience
router.delete("/:id", authMiddleware, deleteExperience);

// PATCH /api/experiences/:id/deactivate - Soft delete an experience
router.patch("/:id/deactivate", authMiddleware, softDeleteExperience);

module.exports = router;
