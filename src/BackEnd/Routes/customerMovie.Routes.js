import express from "express";

import {
  getCustomerMoviesController,
  searchCustomerMoviesController,
  getCustomerMovieByIdController,
  getCustomerShowtimesController,
} from "../Controller/customerMovie.Controller.js";

const router = express.Router();

// 1. Lấy danh sách phim
router.get("/", getCustomerMoviesController);

// 2. Tìm kiếm phim theo tên
router.get("/search", searchCustomerMoviesController);

// 3. Xem chi tiết phim
router.get("/:id", getCustomerMovieByIdController);

// 4. Xem lịch chiếu của phim
router.get("/:id/showtimes", getCustomerShowtimesController);

export default router;
