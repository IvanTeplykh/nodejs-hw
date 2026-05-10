import createError from 'http-errors';

const errorHandler = (err, req, res, next) => {
  req.log.error(err);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  const error = createError(statusCode, message);
  res.status(error.status).json({ message: error.message });
};

export default errorHandler;
