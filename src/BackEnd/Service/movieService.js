import {
  findAllMovies,
  findMovieById,
  findMovieByTitle,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../Repository/movieRepository.js";

import { validateId } from "../validator/accountValidate.js";
import { validateMovieData } from "../validator/movieValidate.js";
import { AppErrors } from "../validator/AppErrors.js";

// 1. Lấy danh sách tất cả phim
export const getAllMovies = async () => {
  const movies = await findAllMovies();
  return movies;
};

// 2. Tìm phim theo ID
export const getMovieById = async (id) => {
  const idValidate = validateId(id);

  if (!idValidate.valid) {
    throw new AppErrors(idValidate.errors.join(","), 400);
  }

  const movie = await findMovieById(id);

  if (!movie) {
    throw new AppErrors("Phim khong ton tai", 404);
  }

  return movie;
};

// 3. Tìm phim theo tên
export const searchMovies = async (title) => {
  if (typeof title !== "string" || title.trim() === "") {
    throw new AppErrors("Can nhap ten phim", 400);
  }

  const movies = await findMovieByTitle(title.trim());

  return movies;
};

// 4. Thêm phim mới
export const addMovie = async (movieData) => {
  const movieValidate = validateMovieData(movieData);

  if (!movieValidate.valid) {
    throw new AppErrors(movieValidate.errors.join(","), 400);
  }

  const movieId = await createMovie(movieData);

  return movieId;
};

// 5. Cập nhật thông tin phim
export const editMovie = async (id, movieData) => {
  const idValidate = validateId(id);

  if (!idValidate.valid) {
    throw new AppErrors(idValidate.errors.join(","), 400);
  }

  const movie = await findMovieById(id);

  if (!movie) {
    throw new AppErrors("Phim khong ton tai", 404);
  }

  const movieValidate = validateMovieData(movieData);

  if (!movieValidate.valid) {
    throw new AppErrors(movieValidate.errors.join(","), 400);
  }

  await updateMovie(id, movieData);

  return true;
};

// 6. Xóa phim
export const removeMovie = async (id) => {
  const idValidate = validateId(id);

  if (!idValidate.valid) {
    throw new AppErrors(idValidate.errors.join(","), 400);
  }

  const movie = await findMovieById(id);

  if (!movie) {
    throw new AppErrors("Phim khong ton tai", 404);
  }

  try {
    await deleteMovie(id);
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new AppErrors("Khong the xoa phim vi phim da co lich chieu", 409);
    }

    throw error;
  }

  return true;
};
