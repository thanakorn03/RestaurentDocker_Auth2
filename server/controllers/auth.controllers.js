import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../model/index.js";
import sendVerificationEmail from "../utils/email.js";
import crypto from "crypto";

const User = db.User;
const VerificationToken = db.VerificationToken; // ✅ เพิ่ม model token

// สมัครสมาชิก
const signup = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;
  try {
    // Validation
    if (!email || !password || !type || !name) {
      return res.status(400).send({ message: "email, password, type, name are missing" });
    }
    const allowedTypes = ["Admin", "Teacher", "Judge"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({ message: "Invalid user type" });
    }
    if (type === "Teacher" && (!school || !phone)) {
      return res.status(400).send({ message: "school and phone are required for Teacher" });
    }

    // ตรวจสอบผู้ใช้ซ้ำ
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // สร้าง user object
    const userData = { name, email, password, type };
    if (type === "Teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    const user = await User.create(userData);

    // สร้าง verification token สำหรับ Teacher
    if (type === "Teacher") {
      try {
        const token = crypto.randomBytes(32).toString("hex");
        await VerificationToken.create({
          userId: user.id,
          token,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 ชม.
        });

        await sendVerificationEmail(user.email, token, user.name);
        console.log("Verification email sent successfully");
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    }

    return res.status(201).send({
      message: user.type === "Teacher" ? "Teacher registered successfully!" : "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "Teacher" && { isVerified: user.isVerified }),
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message || "Some error occurred while creating the User." });
  }
};

// ฟังก์ชัน signin placeholder
const signin = async (req, res) => {
  return res.status(200).send({ message: "signin not implemented yet" });
};

const authController = { signup, signin };
export default authController;
export { signup, signin };