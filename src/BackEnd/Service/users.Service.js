import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateId,
} from "../validator/account.Validate.js";
import {
  createUser,
  findAccountByEmail,
  findAccountById,
} from "../Repository/account.Repository.js";
import { AppErrors } from "../validator/AppErrors.js";
export const register = async ({ fullname, email, password, phone }) => {
  const fullnameValidated = validateName(fullname);
  const emailValidated = validateEmail(email);
  const passwordValidated = validatePassword(password);
  const phoneValidated = validatePhone(phone);
  const errors = [
    ...fullnameValidated.errors,
    ...emailValidated.errors,
    ...passwordValidated.errors,
    ...phoneValidated.errors,
  ];
  if (errors.length > 0) {
    throw new AppErrors(errors.join(","), 400);
  }
  const account = await findAccountByEmail(email);
  if (account) {
    throw new AppErrors("Email da ton tai", 409);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await createUser(fullname, email, hashPassword, phone);
  const findAccount = await findAccountByEmail(email);
  const safeAccount = {
    id: findAccount.user_id,
    fullname: findAccount.fullname,
    email: findAccount.email,
    phone: findAccount.phone,
    role: findAccount.role_id,
  };
  return safeAccount;
};

export const login = async ({ email, password }) => {
  const emailValidated = validateEmail(email);
  const passwordValidated = validatePassword(password);
  const errors = [...emailValidated.errors, ...passwordValidated.errors];
  if (errors.length > 0) {
    throw new AppErrors(errors.join(","), 400);
  }
  const account = await findAccountByEmail(email);
  if (!account) {
    throw new AppErrors("Email khong dung", 401);
  }
  const passwordResult = await bcrypt.compare(password, account.password);
  if (!passwordResult) {
    throw new AppErrors("Password khong dung", 401);
  }
  const payload = {
    id: account.user_id,
    email: account.email,
    role: account.role_id,
  };
  const token = jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
  return {
    account: {
      id: account.user_id,
      name: account.name,
      email: account.email,
      role: account.role_id,
    },
    token,
  };
};
export const getUserById = async (id) => {
  const idValidate = validateId(id);
  if (!idValidate.valid) {
    throw new AppErrors(idValidate.errors.join(","), 400);
  }
  const account = await findAccountById(id);
  if (!account) {
    throw new AppErrors("Tai khoan khong ton tai", 404);
  }
  return account;
};
