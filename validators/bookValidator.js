const { body, validationResult, param, query } = require('express-validator');
const errorResource = require('../resources/errorResource');
const BookService = require('../services/bookService'); // Import the BookService
const DuplicateEntryError = require('../exceptions/DuplicateEntryError'); // Import your custom exception
const { Book } = require('../models'); // Import the Book model
const NotFoundError = require('../exceptions/NotFoundError'); // Import your custom exception


const addBookValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be at least 1'),

  // Custom validator for checking duplicate ISBN
  async (req, res, next) => {
    try {
      const { isbn } = req.body;
      const existingBook = await BookService.getBookByISBN(isbn); // Adjust this method to your actual service method

      if (existingBook) {
        throw new DuplicateEntryError('A book with this ISBN already exists');
      }
      
      next();
    } catch (error) {
      next(error); // Pass any error to the error handler
    }
  },

  // Final validation result check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResource(errors.array(), 400)); // Pass the status code
    }
    next();
  },
];

const updateBookValidator = [
  // Check that the book exists by ID
  param('id').custom(async (id) => {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
  }),

  // Other validations
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('author').optional().notEmpty().withMessage('Author is required'),
  body('isbn').optional().notEmpty().withMessage('ISBN is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity should be at least 1'),
  body('availableQuantity').optional().isInt({ min: 0 }).withMessage('Available quantity should be at least 0'),


  // Final validation result check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResource(errors.array(), 400));
    }
    next();
  },
];


const deleteBookValidator = [
  // Check that the book exists by ID
  param('id').custom(async (id) => {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
  }),

  // Final validation result check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResource(errors.array(), 400));
    }
    next();
  },
];

const retrieveBookValidator = [
  // Validate that at least one of the parameters is provided
  query('id').optional().isString().withMessage('ID must be a string'),
  query('author').optional().isString().matches(/^[a-zA-Z\s]+$/).withMessage('Author name must be alphabetic'),
  query('title').optional().isString().matches(/^[\w\s]+$/).withMessage('Title must contain only letters, numbers, and spaces'),
  query('isbn').optional().isString().matches(/^\d{10}(\d{3})?$/).withMessage('ISBN must be 10 or 13 digits'),

  // Custom validation to check if at least one field exists
  (req, res, next) => {
    const errors = validationResult(req);

    const { id, author, title, isbn } = req.query;
    if (!id && !author && !title && !isbn) {
      return res.status(400).json(errorResource([{ msg: 'At least one of id, author, title, or ISBN is required' }], 400));
    }

    // If there are validation errors, send them in the response
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResource(errors.array(), 400));
    }

    next();
  }
];

module.exports = updateBookValidator;

module.exports = {
  addBookValidator,
  updateBookValidator,
  deleteBookValidator,
  retrieveBookValidator,
};
