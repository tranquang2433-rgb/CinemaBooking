import { getAllAccounts, getAccountById } from "../Service/accountService.js";
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
