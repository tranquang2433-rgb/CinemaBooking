import { AppErrors } from "../validator/AppErrors.js";

export const checkOwner = async (req, res, next) => {
  if (Number(req.user.id) !== Number(req.params.id)) {
    throw new AppErrors("Khong co quyen truy cap vao tai khoan nay", 403);
  }
  next();
};
