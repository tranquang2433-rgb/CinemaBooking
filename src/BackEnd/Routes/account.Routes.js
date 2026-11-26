import express from "express";
import {
  getAllAccountsController,
  getAccountByIdController,
  deleteAccountController,
  updateAccountController,
} from "../Controller/account.Controller.js";
import { authenticate } from "../Middleware/authenticate.middleware.js";
import { authorization } from "../Middleware/authorize.middleware.js";

const router = express.Router();

router.get("/", authenticate, authorization(1), getAllAccountsController);
router.get("/:id", authenticate, authorization(1), getAccountByIdController);
// router.delete("/:id", authenticate, authorization(1), deleteAccountController);
// router.put("/:id", authenticate, updateAccountController);
export default router;
