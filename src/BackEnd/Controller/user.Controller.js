import { json } from "express";
import { login, register, getUserById } from "../Service/users.Service.js";
export const registerController = async (req, res) => {
  const { fullname, email, password, phone } = req.body;
  const account = await register({ fullname, email, password, phone });
  return res.status(201).json({
    message: "Dang ky thanh cong",
    account: {
      id: account.id,
      fullname: account.fullname,
      email: account.email,
      phone: account.phone,
      role: account.role,
    },
  });
};
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await login({ email, password });
  return res.status(201).json({
    message: "Dang nhap thanh cong",
    result,
  });
};
export const getUserByIdController = async (req, res) => {
  const id = req.params.id;
  const account = await getUserById(id);
  return res.status(200).json({
    data: account,
  });
};

// export const updateUserController = async (req, res) => {
//   const id = req.params.id;
//   const { fullname, email, phone } = req.body;
//   const account = await updateAccountById(id, fullname, email, phone);
//   return res.status(201).json({
//     message: "Cap nhat thanh cong",
//     data: account,
//   });
// };
