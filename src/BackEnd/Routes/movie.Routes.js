import express from "express";

import {
  getAllMoviesController,
  getMovieByIdController,
  searchMoviesController,
  addMovieController,
  editMovieController,
  removeMovieController,
} from "../Controller/movie.Controller.js";
import { authenticate } from "../Middleware/authenticate.middleware.js";
import { authorization } from "../Middleware/authorize.middleware.js";

const router = express.Router();

// Lấy danh sách tất cả phim
router.get("/", authenticate, authorization(1), getAllMoviesController);

// Tìm phim theo tên
router.get("/search", authenticate, authorization(1), searchMoviesController);

// Lấy thông tin phim theo ID
router.get("/:id", authenticate, authorization(1), getMovieByIdController);

// Thêm phim mới
router.post("/", authenticate, authorization(1), addMovieController);

// Cập nhật phim
router.put("/:id", authenticate, authorization(1), editMovieController);

// Xóa phim
router.delete("/:id", authenticate, authorization(1), removeMovieController);

export default router;
