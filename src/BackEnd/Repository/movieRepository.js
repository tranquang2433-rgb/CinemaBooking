import { pool } from "../config/database.js";

// 1. Tìm phim theo ID
export const findMovieById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM movies
     WHERE movie_id = ?
    `,
    [id],
  );

  return rows[0];
};

// 2. Tìm phim theo tên
export const findMovieByTitle = async (title) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM movies
     WHERE title LIKE ?
     ORDER BY movie_id DESC
    `,
    [`%${title}%`],
  );

  return rows;
};

// 3. Thêm phim mới
export const createMovie = async (movieData) => {
  const {
    title,
    description,
    duration,
    release_date,
    age_rating,
    language,
    poster_url,
    trailer_url,
    format,
    status,
  } = movieData;

  const [result] = await pool.query(
    `INSERT INTO movies (
      title,
      description,
      duration,
      release_date,
      age_rating,
      language,
      poster_url,
      trailer_url,
      format,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      title,
      description,
      duration,
      release_date,
      age_rating,
      language,
      poster_url,
      trailer_url,
      format,
      status,
    ],
  );

  return result.insertId;
};

// 4. Cập nhật thông tin phim
export const updateMovie = async (id, movieData) => {
  const {
    title,
    description,
    duration,
    release_date,
    age_rating,
    language,
    poster_url,
    trailer_url,
    format,
    status,
  } = movieData;

  const [result] = await pool.query(
    `UPDATE movies
     SET title = ?,
         description = ?,
         duration = ?,
         release_date = ?,
         age_rating = ?,
         language = ?,
         poster_url = ?,
         trailer_url = ?,
         format = ?,
         status = ?
     WHERE movie_id = ?
    `,
    [
      title,
      description,
      duration,
      release_date,
      age_rating,
      language,
      poster_url,
      trailer_url,
      format,
      status,
      id,
    ],
  );

  return result.affectedRows;
};

// 5. Xóa phim theo ID
export const deleteMovie = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM movies
     WHERE movie_id = ?
    `,
    [id],
  );

  return result.affectedRows;
};
// 6. Lấy danh sách tất cả phim
export const findAllMovies = async () => {
  const [rows] = await pool.query(
    `SELECT *
     FROM movies
     ORDER BY movie_id DESC
    `,
  );

  return rows;
};
