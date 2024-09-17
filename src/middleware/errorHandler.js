class ErrorHandler extends Error {
  constructor(code, message) {
    super( code,message);
    this.code = code;
    this.message = message
    Error.captureStackTrace(this, this.constructor); //obj ku stack prop tharum andha stack prop vachu err enga generate aagudhu nu kandupidikalaam
  }
}

module.exports = ErrorHandler;
