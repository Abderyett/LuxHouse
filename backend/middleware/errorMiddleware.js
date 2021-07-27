exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const error = res.statusCode === 200 ? 500 : res.statusCode;

  const errorText =
    error && error.toString().startsWith('4') ? 'fail' : 'error';

  res.status(error).json({
    status: errorText,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
