import db from "../model/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs"; //ใช้ในการเข้ารหัสรหัสผ่าน
import jwt from "jsonwebtoken"; //ใช้ในการแลกเปลี่ยนข้อมูลระหว่างเซิร์ฟเวอร์และไคลเอนต์
import config from "../config/auth.config.js"; //ใช้ในการเข้าถึงค่า secret key สำหรับ JWT

import { Op } from "sequelize"; //ใช้ในการจัดการกับการค้นหาข้อมูลในฐานข้อมูล

const authController = {};

authController.register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "Username, Name, Email or Password can not be empty!" });
    }

    const user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const newUser = {
      username,
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    };

    const createdUser = await User.create(newUser);

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: { [Op.or]: req.body.roles },
        },
      });
      if (roles.length === 0) {
        return res.status(400).json({ message: "Role not found!" });
      }
      await createdUser.setRoles(roles);
    } else {
      await createdUser.setRoles([1]);
    }

    return res.status(201).json({ message: "User was registered successfully!" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: error.message || "Something error while create the user",
    });
  }
};

authController.signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "Username or Password are missing!" });
    return;
  }
  // Select * from user where username = username
  await User.findOne({ where: { username } })
   .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found!" });
        return;
      }
      // Check password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        return;
      }
      // Create token
      const token = jwt.sign({ id: user.username }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      // Get roles
      const authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          accessToken: token,
          roles: authorities,
          userInfo: {
            username: user.username,
            name: user.name,
            email: user.email,
          },
        });
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message || "Something error while signin" });
    }); 
};



export default authController;