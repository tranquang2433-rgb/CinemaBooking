import express from "express";
import {
  getAllAccountsController,
  getAccountByIdController,
} from "../Controller/accountController.js";

const router = express.Router();

router.get("/", getAllAccountsController);

router.get("/:id", getAccountByIdController);

export default router;
