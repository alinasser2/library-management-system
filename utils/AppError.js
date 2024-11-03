// utils/AppError.js
class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // To distinguish operational errors from programming errors
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class CustomException extends AppError {
    constructor(message = 'Resource not found') {
      super(message, 404);
    }
  }
  
  class ValidationError extends AppError {
    constructor(message = 'Validation error') {
      super(message, 400);
    }
  }
  
  // You can add more custom errors as needed
  
  module.exports = {
    AppError,
    CustomException,
    ValidationError,
  };
  