export const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    code: statusCode,
    message: err.message || "Internal Server Error"
  });
}