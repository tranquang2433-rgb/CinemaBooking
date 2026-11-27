import express from "express";
import {
  getUserByIdController,
  loginController,
  registerController,
  updateUserController,
  updateUserPasswordController,
} from "../Controller/user.Controller.js";
import { authenticate } from "../Middleware/authenticate.middleware.js";
import { checkOwner } from "../Middleware/checkOwner.js";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/:id", authenticate, checkOwner, getUserByIdController);
router.put("/:id", authenticate, checkOwner, updateUserController);
router.put("/:id", authenticate, checkOwner, updateUserPasswordController);
export default router;
