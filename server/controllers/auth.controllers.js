// controllers/auth.controller.js
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../model/index.js";
import sendVerificationEmail from "../utils/email.js";
import path from "path";
import authConfig from "../config/auth.config.js";

const User = db.User;
const VerificationToken = db.VerificationToken;

const signup = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;

  try {
    // Validation: check required fields
    if (!email || !password || !type || !name) {
      return res.status(400).json({ message: "email, password, type, name are required" });
    }

    const allowedTypes = ["student", "teacher", "admin", "judge"];
    const userType = type.toLowerCase();
    if (!allowedTypes.includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    if (userType === "teacher" && (!school || !phone)) {
      return res.status(400).json({ message: "school and phone are required for Teacher" });
    }

    // ตรวจสอบผู้ใช้ซ้ำ
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // สร้าง user object
    const username = email.split("@")[0];

    const userData = { 
      username, 
      name, 
      email, 
      password, 
      type 
    };

    if (userType === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    const user = await User.create(userData);

    // สร้าง verification token สำหรับ Student และ Teacher
    if (["teacher", "student"].includes(userType)) {
      const token = crypto.randomBytes(32).toString("hex");
      await VerificationToken.create({
        userId: user.id,
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 ชม.
      });

      await sendVerificationEmail(user.email, token, user.name);
      console.log("Verification email sent successfully");
    }

    return res.status(201).json({
      message: `User (${userType}) registered successfully!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        isverified: user.isverified,
        ...(user.type === "teacher" && { school: user.school, phone: user.phone }),
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: error.message || "Some error occurred while creating the User." });
  }
};

// ฟังก์ชัน signin placeholder
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = await user.comparePassword(password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.type === "teacher" && !user.isverified) {
      return res.status(403).json({ message: "Please verify your email before signin." });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 24 * 60 * 60 * 1000 }); // 24 ชม.

    return res.status(200).json({
      message: "Signin successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isverified: user.isverified, school: user.school, phone: user.phone }),
      },
      accessToken: token,
    });

  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// แก้ให้ใช้ query string: /verify-email?token=xxx
const verificationEmail = async (req, res) => {
  // ตรวจสอบ token จากทั้ง param หรือ query
  const token = req.params.token || req.query.token;

  if (!token) {
    return res.status(400).json({ message: "Verification token is required" });
  }

  try {
    // หา token ในฐานข้อมูล
    const vToken = await VerificationToken.findOne({ where: { token } });
    if (!vToken) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    // ตรวจสอบวันหมดอายุ
    if (vToken.expires_at < new Date()) {
      await vToken.destroy();
      return res.status(400).json({ message: "Verification token has expired" });
    }

    // หา user
    const user = await User.findByPk(vToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // อัปเดตสถานะ user เป็น verified
    await user.update({ isverified: true });

    // ลบ token
    await vToken.destroy();

    // ส่งหน้า HTML สำเร็จ
    const htmlPath = path.join(process.cwd(), "views", "verification-success.html");
    return res.sendFile(htmlPath);

  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export default { signup, signin, verificationEmail };
export { signup, signin, verificationEmail };
