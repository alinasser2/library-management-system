const { body, validationResult, param } = require('express-validator');
const createErrorResponse = require('../resources/errorResource');
const CustomException = require('../exceptions/CustomException');
const validatorMiddleware = require('../middlewares/validatorMiddleware');


const borrowBookValidator = [
  body('bookId')
    .notEmpty().withMessage('Book ID is required'),

  body('userId')
    .notEmpty().withMessage('User ID is required'),

  
  body('dueDate')
    .notEmpty().withMessage('Due date is required')
    .isISO8601().withMessage('Due date must be a valid date in ISO 8601 format')
    .toDate()
    .custom((value) => {
      const now = new Date();
      if (value <= now) {
        throw new CustomException('Due date must be in the future');
      }
      return true;
    }),
    validatorMiddleware
];


const returnBookValidator = [
  // Validate that the ID parameter exists and is a valid format
  param('id')
    .notEmpty().withMessage('Borrow record ID is required'),

  // Final validation result check
  validatorMiddleware
];
module.exports = {
  borrowBookValidator,
  returnBookValidator
};
