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
    format,
    status,
  } = movieData;

  // Kiểm tra tên phim
  if (typeof movieData.title !== "string" || movieData.title.trim() === "") {
    result.valid = false;
    result.errors.push("Ten phim khong duoc de trong");
  } else if (movieData.title.trim().length > 200) {
    result.valid = false;
    result.errors.push("Ten phim toi da 200 ky tu");
  }

  // Kiểm tra thời lượng
  if (!Number.isInteger(movieData.duration) || movieData.duration <= 0) {
    result.valid = false;
    result.errors.push("Thoi luong phim phai la so nguyen duong");
  }

  // Kiểm tra mô tả
  if (
    movieData.description != null &&
    typeof movieData.description !== "string"
  ) {
    result.valid = false;
    result.errors.push("Mo ta phim khong hop le");
  }

  // Kiểm tra giới hạn độ tuổi
  if (
    movieData.age_rating != null &&
    (typeof movieData.age_rating !== "string" ||
      movieData.age_rating.length > 20)
  ) {
    result.valid = false;
    result.errors.push("Gioi han do tuoi khong hop le");
  }

  // Kiểm tra ngôn ngữ
  if (
    movieData.language != null &&
    (typeof movieData.language !== "string" || movieData.language.length > 50)
  ) {
    result.valid = false;
    result.errors.push("Ngon ngu khong hop le");
  }

  // Kiểm tra định dạng phim
  if (movieData.format != null && !["2D", "3D"].includes(movieData.format)) {
    result.valid = false;
    result.errors.push("Dinh dang phim chi duoc la 2D hoac 3D");
  }

  // Kiểm tra trạng thái phim
  if (!["NOW_SHOWING", "COMING_SOON", "ENDED"].includes(movieData.status)) {
    result.valid = false;
    result.errors.push("Trang thai phim khong hop le");
  }

  return result;
};
