import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../model/db.js";

// ตรวจสอบ token
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (!token) return res.status(403).send({ message: "No token provided!" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
    req.username = decoded.username;
    next();
  });
};

// ตรวจสอบ role admin
const isAdmin = (req, res, next) => {
  db.user.findByPk(req.username).then(user => {
    user.getRoles().then(roles => {
      if (roles.some(r => r.name === "admin")) next();
      else res.status(403).send({ message: "Require Admin Role!" });
    });
  });
};

// ตรวจสอบ owner ของร้าน หรือ admin
const isOwnerOrAdmin = (req, res, next) => {
  const restaurantId = req.params.id;
  db.restaurant.findByPk(restaurantId).then(restaurant => {
    if (!restaurant) return res.status(404).send({ message: "Restaurant not found" });

    if (restaurant.userId === req.username) {
      next(); // เจ้าของร้าน
    } else {
      db.user.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
          if (roles.some(r => r.name === "admin")) next();
          else res.status(403).send({ message: "Not authorized" });
        });
      });
    }
  });
};

export default {
  verifyToken,
  isAdmin,
  isOwnerOrAdmin,
};
