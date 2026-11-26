import express from "express";

import {
  getAllMoviesController,
  getMovieByIdController,
  searchMoviesController,
  addMovieController,
  editMovieController,
  removeMovieController,
} from "../Controller/movieController.js";

const router = express.Router();

// Lấy danh sách tất cả phim
router.get("/", getAllMoviesController);

// Tìm phim theo tên
router.get("/search", searchMoviesController);

// Lấy thông tin phim theo ID
router.get("/:id", getMovieByIdController);

// Thêm phim mới
router.post("/", addMovieController);

// Cập nhật phim
router.put("/:id", editMovieController);

// Xóa phim
router.delete("/:id", removeMovieController);

export default router;
