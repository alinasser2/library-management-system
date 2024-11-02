const { body, validationResult, param} = require('express-validator');
const createErrorResponse = require('../resources/errorResource');
const BookService = require('../services/bookService'); // Import the BookService
const DuplicateEntryError = require('../exceptions/DuplicateEntryError'); // Import your custom exception
const Book = require('../models/bookModel'); // Import the Book model
const NotFoundError = require('../exceptions/NotFoundError'); // Import your custom exception

const addBookValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('ISBN').notEmpty().withMessage('ISBN is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be at least 1'),

  // Custom validator for checking duplicate ISBN
  async (req, res, next) => {
    try {
      const { ISBN } = req.body;
      const existingBook = await BookService.getBookByISBN(ISBN); // Adjust this method to your actual service method

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
      return res.status(400).json(createErrorResponse(errors.array(), 400)); // Pass the status code
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
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('ISBN').notEmpty().withMessage('ISBN is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be at least 1'),

  // Final validation result check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse(errors.array(), 400));
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
      return res.status(400).json(createErrorResponse(errors.array(), 400));
    }
    next();
  },
];

const retrieveBookValidator = [
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
      return res.status(400).json(createErrorResponse(errors.array(), 400));
    }
    next();
  },
];


const searchBookValidator = [
  // Check that the book exists by ID
  param('query').notEmpty().withMessage('Query is required'),

  // Final validation result check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse(errors.array(), 400));
    }
    next();
  },
];

module.exports = updateBookValidator;

module.exports = {
  addBookValidator,
  updateBookValidator,
  deleteBookValidator,
  retrieveBookValidator,
};
