const express = require("express");
const router = express.Router();
const {
  getAllSkillCategories,
  getSkillCategoryById,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  addSkillToCategory,
  removeSkillFromCategory,
} = require("../controllers/skillsController");
const { authMiddleware } = require("../middleware/authMiddleware");

// GET /api/skills - Get all skill categories
router.get("/", getAllSkillCategories);

// GET /api/skills/:id - Get a single skill category
router.get("/:id", getSkillCategoryById);

// POST /api/skills - Create a new skill category
router.post("/", authMiddleware, createSkillCategory);

// PUT /api/skills/:id - Update a skill category
router.put("/:id", authMiddleware, updateSkillCategory);

// DELETE /api/skills/:id - Delete a skill category
router.delete("/:id", authMiddleware, deleteSkillCategory);

// POST /api/skills/:id/add-skill - Add a skill to a category
router.post("/:id/add-skill", authMiddleware, addSkillToCategory);

// POST /api/skills/:id/remove-skill - Remove a skill from a category
router.post("/:id/remove-skill", authMiddleware, removeSkillFromCategory);

module.exports = router;
