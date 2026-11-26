export const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};
