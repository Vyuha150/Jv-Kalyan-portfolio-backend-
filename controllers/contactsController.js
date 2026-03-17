const ContactQuery = require("../models/ContactQuery");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createContactQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    if (!EMAIL_REGEX.test(String(email).trim())) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    const query = await ContactQuery.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
    });

    res.status(201).json({
      message: "Contact query submitted successfully",
      query,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllContactQueries = async (req, res) => {
  try {
    const contactQueries = await ContactQuery.find().sort({ createdAt: -1 });
    res.json(contactQueries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markContactQueryRead = async (req, res) => {
  try {
    const query = await ContactQuery.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ message: "Contact query not found" });
    }

    res.json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContactQuery = async (req, res) => {
  try {
    const query = await ContactQuery.findByIdAndDelete(req.params.id);

    if (!query) {
      return res.status(404).json({ message: "Contact query not found" });
    }

    res.json({ message: "Contact query deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContactQuery,
  getAllContactQueries,
  markContactQueryRead,
  deleteContactQuery,
};
