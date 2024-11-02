const { body, validationResult } = require('express-validator');
const createErrorResponse = require('../resources/errorResource');
const { Book, Borrower } = require('../models');
const { NotFoundError } = require('../exceptions/NotFoundError');
const { FutureDateError } = require('../exceptions/FutureDateError'); // Corrected import

const borrowBookValidator = [
  body('bookId')
    .notEmpty().withMessage('Book ID is required')
    .custom(async (bookId) => {
      const book = await Book.findByPk(bookId);
      if (!book) {
        throw new NotFoundError('Book not found');
      }
    }),

  body('borrowerId')
    .notEmpty().withMessage('Borrower ID is required')
    .custom(async (borrowerId) => {
      const borrower = await Borrower.findByPk(borrowerId);
      if (!borrower) {
        throw new NotFoundError('Borrower not found');
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

module.exports = {
  borrowBookValidator,
};
