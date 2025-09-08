import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../model/index.js";
import crypto from "crypto";

const User = db.User;

// สมัครสมาชิก
const signup = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;
  try {
    // Check validation required 
    if (!email || !password || !type || !name) {
      return res.status(400).send({ message: "email, password, type, name are missing" });
    }
    // Check allowed types
    const allowedTypes = ["Admin", "Teacher", "Judge"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({ message: "Invalid user type" });
    }
    // Teacher ต้องมี school + phone
    if (type === "Teacher" && (!school || !phone)) {
      return res.status(400).send({ message: "school and phone are required for Teacher" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { email } 
    });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }
    // Create user data object
    const userDate  = {
      name : name,
      email : email,
      password : password,
      type : type
    };
    if (type === "Teacher") {
      userDate.school = school;
      userDate.phone = phone;
    }

    // Create user
    const user = await User.create(userDate);

    //if user is a teacher, create a teacher record
     if (type === "Teacher") {
      try {
        const token = crypto.randomBytes(32).toString("hex");
        await db.VerificationToken.create({
          userId: user.id,
          token,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        });
      } catch (error) {
        console.error("Error creating verification token:", error);
      }
    }
    return res.status(201).send({
      message : user.type === "Teacher" ? "Teacher registered successfully!" : "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "Teacher" && {isVerified: user.isVerified}),
      },
    });

  } catch (error) {
    return res.status(500).send({ message: error.message || "Some error occurred while creating the User." });
  }
};
