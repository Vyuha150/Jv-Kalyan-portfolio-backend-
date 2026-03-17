const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const {
  getAllAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  softDeleteAchievement,
} = require("../controllers/achievementsController");
const { authMiddleware } = require("../middleware/authMiddleware");

// GET /api/achievements - Get all achievements
router.get("/", getAllAchievements);

// GET /api/achievements/:id - Get a single achievement
router.get("/:id", getAchievementById);

// POST /api/achievements - Create a new achievement (with image upload)
router.post("/", authMiddleware, upload.single("image"), createAchievement);

// PUT /api/achievements/:id - Update an achievement (with optional image upload)
router.put("/:id", authMiddleware, upload.single("image"), updateAchievement);

// DELETE /api/achievements/:id - Delete an achievement
router.delete("/:id", authMiddleware, deleteAchievement);

// PATCH /api/achievements/:id/deactivate - Soft delete an achievement
router.patch("/:id/deactivate", authMiddleware, softDeleteAchievement);

module.exports = router;
