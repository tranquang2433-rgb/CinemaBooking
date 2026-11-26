import {
  findAllMovies,
  findMovieById,
  findMovieByTitle,
} from "../Repository/movieRepository.js";

import { findShowtimesByMovieId } from "../Repository/showtimeRepository.js";

import { validateId } from "../validator/account.Validate.js";

import { AppErrors } from "../validator/AppErrors.js";

// 1. Lấy danh sách phim dành cho khách hàng
export const getCustomerMovies = async () => {
  const movies = await findAllMovies();

  // Không hiển thị phim đã kết thúc
  return movies.filter((movie) => movie.status !== "ENDED");
};

// 2. Tìm kiếm phim theo tên
export const searchCustomerMovies = async (title) => {
  if (typeof title !== "string" || title.trim() === "") {
    throw new AppErrors("Vui long nhap ten phim", 400);
  }

  const movies = await findMovieByTitle(title.trim());

  return movies.filter((movie) => movie.status !== "ENDED");
};

// 3. Xem chi tiết phim
export const getCustomerMovieById = async (id) => {
  const idValidate = validateId(id);

  if (!idValidate.valid) {
    throw new AppErrors(idValidate.errors.join(", "), 400);
  }

  const movie = await findMovieById(id);

  if (!movie || movie.status === "ENDED") {
    throw new AppErrors("Phim khong ton tai hoac da ket thuc", 404);
  }

  return movie;
};

// 4. Xem lịch chiếu của phim
export const getCustomerShowtimes = async (movieId) => {
  const idValidate = validateId(movieId);

  if (!idValidate.valid) {
    throw new AppErrors(idValidate.errors.join(", "), 400);
  }

  const movie = await findMovieById(movieId);

  if (!movie || movie.status === "ENDED") {
    throw new AppErrors("Phim khong ton tai hoac da ket thuc", 404);
  }

  const showtimes = await findShowtimesByMovieId(movieId);

  return showtimes;
};
