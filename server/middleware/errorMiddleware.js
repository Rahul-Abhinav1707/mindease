export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  const isMongoReadyError =
    error.name === "MongooseError" &&
    (error.message.includes("buffering timed out") || error.message.includes("before initial connection is complete"));

  res.status(isMongoReadyError ? 503 : statusCode).json({
    message: isMongoReadyError ? "Database is not connected yet. Please retry in a moment." : error.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack
  });
}
