require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jv-kalyan";

const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@jvkalyan.com")
  .trim()
  .toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_ROLE = process.env.ADMIN_ROLE || "admin";

async function seedAdmin() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const existingUser = await User.findOne({ email: ADMIN_EMAIL });

    if (existingUser) {
      existingUser.name = ADMIN_NAME;
      existingUser.password = hashedPassword;
      existingUser.role = ADMIN_ROLE;
      await existingUser.save();
      console.log(`Updated admin user: ${ADMIN_EMAIL}`);
    } else {
      await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: ADMIN_ROLE,
      });
      console.log(`Created admin user: ${ADMIN_EMAIL}`);
    }

    console.log("Admin seeding complete");
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

seedAdmin();
