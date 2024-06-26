const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // برای خطاهای ناشناخته
  return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
