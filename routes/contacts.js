const express = require("express");
const router = express.Router();
const {
  createContactQuery,
  getAllContactQueries,
  markContactQueryRead,
  deleteContactQuery,
} = require("../controllers/contactsController");
const { authMiddleware } = require("../middleware/authMiddleware");

// POST /api/contacts - Public contact form submission
router.post("/", createContactQuery);

// GET /api/contacts - Admin listing
router.get("/", authMiddleware, getAllContactQueries);

// PATCH /api/contacts/:id/read - Mark query as read
router.patch("/:id/read", authMiddleware, markContactQueryRead);

// DELETE /api/contacts/:id - Delete query
router.delete("/:id", authMiddleware, deleteContactQuery);

module.exports = router;
