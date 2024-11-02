// validators/bookValidators.js
const { body, validationResult } = require('express-validator');
const createErrorResponse = require('../utils/errorResponse');

const addBookValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('ISBN').notEmpty().withMessage('ISBN is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be at least 1'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse(errors.array(), 400)); // Pass the status code
    }
    next();
  },
];  

module.exports = {
  addBookValidator,
};
