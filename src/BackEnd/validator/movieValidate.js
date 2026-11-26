import { validationResult } from "./validateResult.js";

// Kiểm tra dữ liệu phim
export const validateMovieData = (movieData) => {
  const result = validationResult();

  // Kiểm tra dữ liệu có phải object không
  if (!movieData || typeof movieData !== "object" || Array.isArray(movieData)) {
    result.valid = false;
    result.errors.push("Du lieu phim khong hop le");
    return result;
  }

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

  // Kiểm tra tên phim
  if (typeof title !== "string" || title.trim() === "") {
    result.valid = false;
    result.errors.push("Ten phim khong duoc de trong");
  } else if (title.trim().length > 200) {
    result.valid = false;
    result.errors.push("Ten phim toi da 200 ky tu");
  }

  // Kiểm tra thời lượng
  if (!Number.isInteger(duration) || duration <= 0) {
    result.valid = false;
    result.errors.push("Thoi luong phim phai la so nguyen duong");
  }

  // Kiểm tra mô tả
  if (description != null && typeof description !== "string") {
    result.valid = false;
    result.errors.push("Mo ta phim khong hop le");
  }

  // Kiểm tra giới hạn độ tuổi
  if (
    age_rating != null &&
    (typeof age_rating !== "string" || age_rating.length > 20)
  ) {
    result.valid = false;
    result.errors.push("Gioi han do tuoi khong hop le");
  }

  // Kiểm tra ngôn ngữ
  if (
    language != null &&
    (typeof language !== "string" || language.length > 50)
  ) {
    result.valid = false;
    result.errors.push("Ngon ngu khong hop le");
  }

  // Kiểm tra poster
  if (
    poster_url != null &&
    (typeof poster_url !== "string" || poster_url.length > 500)
  ) {
    result.valid = false;
    result.errors.push("Poster URL khong hop le");
  }

  // Kiểm tra trailer
  if (
    trailer_url != null &&
    (typeof trailer_url !== "string" || trailer_url.length > 500)
  ) {
    result.valid = false;
    result.errors.push("Trailer URL khong hop le");
  }

  // Kiểm tra định dạng phim
  if (format != null && !["2D", "3D"].includes(format)) {
    result.valid = false;
    result.errors.push("Dinh dang phim chi duoc la 2D hoac 3D");
  }

  // Kiểm tra trạng thái phim
  if (!["NOW_SHOWING", "COMING_SOON", "ENDED"].includes(status)) {
    result.valid = false;
    result.errors.push("Trang thai phim khong hop le");
  }

  return result;
};
