import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({
      message: "Nguoi dung khong du quyen han",
    });
  }
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "token khong hop le",
    });
  }
  try {
    const decode = jwt.verify(token, env.jwt.secret);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "token khong hop le",
    });
  }
};
