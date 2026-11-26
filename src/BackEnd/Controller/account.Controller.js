import { json } from "express";
import {
  getAllAccounts,
  getAccountById,
  deleteAccountById,
  updateAccountById,
} from "../Service/account.Service.js";
export const getAllAccountsController = async (req, res) => {
  const accounts = await getAllAccounts();
  return res.status(200).json({
    data: accounts,
  });
};
export const getAccountByIdController = async (req, res) => {
  const id = req.params.id;
  const account = await getAccountById(id);
  return res.status(200).json({
    data: account,
  });
};

// export const deleteAccountController = async (req, res) => {
//   const id = req.params.id;
//   const account = await deleteAccountById(id);
//   return res.status(200).json({
//     message: "Xoa thanh cong",
//     data: account,
//   });
// };

// export const updateAccountController = async (req, res) => {
//   const id = req.params.id;
//   const { fullname, email, phone } = req.body;
//   const account = await updateAccountById(id, fullname, email, phone);
//   return res.status(201).json({
//     message: "Cap nhat thanh cong",
//     data: account,
//   });
// };
