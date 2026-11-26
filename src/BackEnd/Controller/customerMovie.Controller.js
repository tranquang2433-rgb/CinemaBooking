import {
  getCustomerMovies,
  searchCustomerMovies,
  getCustomerMovieById,
  getCustomerShowtimes,
} from "../Service/customerMovie.Service.js";

// 1. Lấy danh sách phim
export const getCustomerMoviesController = async (req, res) => {
  const movies = await getCustomerMovies();

  return res.status(200).json({
    success: true,
    data: movies,
  });
};

// 2. Tìm kiếm phim theo tên
export const searchCustomerMoviesController = async (req, res) => {
  const title = req.query.title;

  const movies = await searchCustomerMovies(title);

  return res.status(200).json({
    success: true,
    data: movies,
  });
};

// 3. Xem chi tiết phim
export const getCustomerMovieByIdController = async (req, res) => {
  const id = req.params.id;

  const movie = await getCustomerMovieById(id);

  return res.status(200).json({
    success: true,
    data: movie,
  });
};

// 4. Xem lịch chiếu của phim
export const getCustomerShowtimesController = async (req, res) => {
  const movieId = req.params.id;

  const showtimes = await getCustomerShowtimes(movieId);

  return res.status(200).json({
    success: true,
    data: showtimes,
  });
};
