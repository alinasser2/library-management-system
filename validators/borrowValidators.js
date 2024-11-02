const { body, validationResult, param } = require('express-validator');
const createErrorResponse = require('../resources/errorResource');
const { Book, User, Borrow } = require('../models');
const NotFoundError = require('../exceptions/NotFoundError'); // Make sure this import is correct
const FutureDateError = require('../exceptions/FutureDateError');

const borrowBookValidator = [
  body('bookId')
    .notEmpty().withMessage('Book ID is required')
    .custom(async (bookId) => {
      const book = await Book.findByPk(bookId);
      if (!book) {
        throw new NotFoundError('Book not found');
      }
    }),

  body('userId')
    .notEmpty().withMessage('User ID is required')
    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }
    }),
  
  body('dueDate')
    .notEmpty().withMessage('Due date is required')
    .isISO8601().withMessage('Due date must be a valid date in ISO 8601 format')
    .toDate()
    .custom((value) => {
      const now = new Date();
      if (value <= now) {
        throw new FutureDateError('Due date must be in the future');
      }
      return true; // indicate validation passed
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse(errors.array(), 400));
    }
    next();
  },
];


const returnBookValidator = [
  // Validate that the ID parameter exists and is a valid format
  param('id')
    .notEmpty().withMessage('Borrow record ID is required')
    .custom(async (id) => {
      const borrowRecord = await Borrow.findByPk(id); // Check if the borrow record exists
      if (!borrowRecord) {
        throw new NotFoundError('Borrow record not found');
      }
      return true; // Indicate validation passed
    }),

  // Final validation result check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse(errors.array(), 400));
    }
    next(); // Proceed to the next middleware if there are no errors
  },
];
module.exports = {
  borrowBookValidator,
  returnBookValidator
};
