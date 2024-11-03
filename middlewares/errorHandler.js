const CustomException = require('../exceptions/CustomException');
const ErrorResource = require('../resources/errorResource');


const errorHandler = (err, req, res, next) => {
  // Handle Not Found errors
  if (err.statusCode === 404) {
    return res.status(404).json(ErrorResource(err.message, 404));
  }

  // Handle CustomException
  if (err instanceof CustomException) {
    return res.status(err.statusCode).json(ErrorResource(err.message, err.statusCode));
  }

  

  // // Handle validation errors
  if (err.statusCode === 400 && err.errors) {
    return res.status(400).json(ErrorResource(err.message, 400, err.errors));
  }
  // handle CustomException

  // Handle other unexpected errors
  console.error(err); // Log the error for debugging
  res.status(500).json(ErrorResource('An unexpected error occurred', 500));

  
};

module.exports = { errorHandler };
