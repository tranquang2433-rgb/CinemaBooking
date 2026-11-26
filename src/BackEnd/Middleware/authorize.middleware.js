import { findAccountById } from "../Repository/account.Repository.js";
export const authorization = (role_id) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Khong duoc cap phep",
        });
      }
      const user = await findAccountById(req.user.id);
      if (!user) {
        return res.status(404).json({
          message: "Khong tim thay tai khoan",
        });
      }
      if (user.role_id !== role_id) {
        return res.status(403).json({
          message: "Khong co quyen",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
