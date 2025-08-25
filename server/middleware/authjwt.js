import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../model/db.js"

// ประกาศด้วย const
const verifyToken = (req, res, next) => {
  // รองรับทั้ง Authorization: Bearer ... และ x-access-token
  let token = req.headers["x-access-token"];
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.username = decoded.username;
    next();
  });
};

const isAdmin = (req, res, next) => {
    db.user.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(401).send({ message: "Require Admin Role!" });
            return;
        });
    });
};

const authJwt = {
  verifyToken,
  isAdmin,
};
export default authJwt;