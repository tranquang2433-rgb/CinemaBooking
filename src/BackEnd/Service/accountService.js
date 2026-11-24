import {
  findAccountById,
  findAllAccounts,
} from "../Repository/accountRepository.js";
import { validateId } from "../validator/accountValidate.js";
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
  const account = await findAccountById(id);
  if (!account) {
    throw new AppErrors("Tai khoan khong ton tai", 404);
  }
  return account;
};
