import { pool } from "../config/database.js";

// 1. Lấy danh sách lịch chiếu của một phim
export const findShowtimesByMovieId = async (movieId) => {
  const [rows] = await pool.query(
    `SELECT
        s.showtime_id,
        s.movie_id,
        s.room_id,
        r.room_name,
        s.start_time,
        s.end_time,
        s.base_price,
        s.status
     FROM showtimes s
     JOIN rooms r ON s.room_id = r.room_id
     WHERE s.movie_id = ?
       AND s.status = 'SCHEDULED'
       AND s.start_time >= NOW()
     ORDER BY s.start_time ASC`,
    [movieId],
  );

  return rows;
};
