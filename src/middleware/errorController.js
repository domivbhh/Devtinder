const errorController = async (err, req, res, next) => {
  statusCode = err.code || 500;
  statusMessage = err.message || "error occured";
  res.status(statusCode).json({
    success:false,
    message: statusMessage,
  });
};

module.exports = errorController;
