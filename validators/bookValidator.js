const { body, query } = require('express-validator');
const errorResource = require('../resources/errorResource');
const { Book } = require('../models'); // Import the Book model
const validatorMiddleware = require('../middlewares/validatorMiddleware');


const addBookValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be at least 1'),
  validatorMiddleware
];

const updateBookValidator = [

  // Other validations
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('author').optional().notEmpty().withMessage('Author is required'),
  body('isbn').optional().notEmpty().withMessage('ISBN is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity should be at least 1'),
  body('availableQuantity').optional().isInt({ min: 0 }).withMessage('Available quantity should be at least 0'),
  validatorMiddleware
];


const deleteBookValidator = [
  // (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json(errorResource(errors.array(), 400));
  //   }
  //   next();
  // },
];

const retrieveBookValidator = [
  // Validate that at least one of the parameters is provided
  query('id').optional().isString().withMessage('ID must be a string'),
  query('author')
    .optional()
    .isString()
    .matches(/^[a-zA-Z\s]+$/).withMessage('Author name must be alphabetic and can include spaces'),
  query('title')
    .optional()
    .isString()
    .matches(/^[\w\s]+$/).withMessage('Title must contain only letters, numbers, and spaces'),
  query('isbn')
    .optional()
    .isString()
    .matches(/^\d{10}(\d{3})?$/).withMessage('ISBN must be 10 or 13 digits'),

  // Custom validation to check if at least one field exists
  (req, res, next) => {
    const { id, author, title, isbn } = req.query;
    if (!id && !author && !title && !isbn) {
      return res.status(400).json(errorResource([{ msg: 'At least one of id, author, title, or ISBN is required' }], 400));
    }
    // Call next() to pass control to the next middleware
    next();
  },

  // Use the validator middleware to handle errors
  validatorMiddleware
];


module.exports = {
  addBookValidator,
  updateBookValidator,
  deleteBookValidator,
  retrieveBookValidator,
};
