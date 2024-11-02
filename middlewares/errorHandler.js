const DuplicateEntryError = require('../exceptions/DuplicateEntryError');
const NotFoundError = require('../exceptions/NotFoundError');
const ErrorResource = require('../resources/errorResource');

const errorHandler = (err, req, res, next) => {
  // Handle Not Found errors
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json(ErrorResource(err.message, err.statusCode));
  }

  // Handle Duplicate Entry errors
  if (err instanceof DuplicateEntryError) {
    return res.status(err.statusCode).json(ErrorResource(err.message, err.statusCode));
  }

  // Handle validation errors
  if (err.statusCode === 400 && err.errors) {
    return res.status(400).json(ErrorResource(err.message, 400, err.errors));
  }

  // Handle other unexpected errors
  console.error(err); // Log the error for debugging
  res.status(500).json(ErrorResource('An unexpected error occurred', 500));
};

module.exports = { errorHandler };
