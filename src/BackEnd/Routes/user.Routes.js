import express from "express";
import {
  getUserByIdController,
  loginController,
  registerController,
  updateUserController,
} from "../Controller/user.Controller.js";
import { authenticate } from "../Middleware/authenticate.middleware.js";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/:id", authenticate, getUserByIdController);
// router.put("/:id", authenticate, updateUserController);
export default router;
