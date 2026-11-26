import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findAccountById,
  findAllAccounts,
  createUser,
  findAccountByEmail,
} from "../Repository/account.Repository.js";
import {
  validateId,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../validator/account.Validate.js";
import { AppErrors } from "../validator/AppErrors.js";
export const getAllAccounts = async () => {
  const accounts = await findAllAccounts();
  return accounts;
};

export const getAccountById = async (id) => {
  const idValidate = validateId(id);
  if (!idValidate.valid) {
    throw new AppErrors(idValidate.errors.join(","), 400);
  }
  const account = await findAccountById(idValidated);
  if (!account) {
    throw new AppErrors("Tai khoan khong ton tai", 404);
  }
  return account;
};

// export const deleteAccountById = async (id) => {
//   const idValidated = validateId(id);
//   if (!idValidated.valid) {
//     throw new AppErrors(idValidated.errors.join(","), 400);
//   }
//   const account = findAccountById(idValidated);
//   if (!account) {
//     throw new AppErrors("Tai khoan khong ton tai", 404);
//   }
//   const result = await deleteAccountById(id);
//   return result;
// };

// export const updateAccountById = async (id, fullname, email, phone) => {
//   const idValidated = validateId(id);
//   const nameValidated = validateName(fullname);
//   const emailValidated = validateEmail(email);
//   const phoneValidated = validatePhone(phone);
//   const errors = [
//     ...idValidated.errors,
//     ...nameValidated.errors,
//     ...emailValidated.errors,
//     ...phoneValidated.errors,
//   ];
//   if (errors.length > 0) {
//     throw new AppErrors(errors.join(","), 400);
//   }
//   const account = await findAccountById(id);
//   if (!account) {
//     throw new AppErrors("Tai khoan khong ton tai", 404);
//   }
//   const result = await updateAccountById(id, {
//     fullname,
//     email,
//     phone,
//   });
//   return result;
// };
