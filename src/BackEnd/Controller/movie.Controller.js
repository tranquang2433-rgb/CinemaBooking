import {
  getAllMovies,
  getMovieById,
  searchMovies,
  addMovie,
  editMovie,
  removeMovie,
} from "../Service/movie.Service.js";

// 1. Lấy danh sách tất cả phim
export const getAllMoviesController = async (req, res) => {
  const movies = await getAllMovies();

  return res.status(200).json({
    data: movies,
  });
};

// 2. Lấy thông tin phim theo ID
export const getMovieByIdController = async (req, res) => {
  const id = req.params.id;
  const movie = await getMovieById(id);

  return res.status(200).json({
    data: movie,
  });
};

// 3. Tìm phim theo tên
export const searchMoviesController = async (req, res) => {
  const title = req.query.title;
  const movies = await searchMovies(title);

  return res.status(200).json({
    data: movies,
  });
};

// 4. Thêm phim mới
export const addMovieController = async (req, res) => {
  const movieId = await addMovie(req.body);

  return res.status(201).json({
    message: "Them phim thanh cong",
    data: {
      movie_id: movieId,
    },
  });
};

// 5. Cập nhật phim
export const editMovieController = async (req, res) => {
  const id = req.params.id;
  await editMovie(id, req.body);

  return res.status(200).json({
    message: "Cap nhat phim thanh cong",
  });
};

// 6. Xóa phim
export const removeMovieController = async (req, res) => {
  const id = req.params.id;
  await removeMovie(id);

  return res.status(200).json({
    message: "Xoa phim thanh cong",
  });
};
