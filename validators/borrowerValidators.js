const { body, validationResult, param } = require('express-validator');
const createErrorResponse = require('../resources/errorResource');
const { Borrower } = require('../models'); // This assumes you have an index file that exports all modelsconst DuplicateEntryError = require('../exceptions/DuplicateEntryError');
const NotFoundError = require('../exceptions/NotFoundError');

const addBorrowerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Email is required and should be valid')
    .custom(async (email) => {
      const existingBorrower = await Borrower.findOne({ where: { email } });
      if (existingBorrower) {
        throw new DuplicateEntryError('Borrower with this email already exists');
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

const updateBorrowerValidator = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Email should be valid'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createErrorResponse(errors.array(), 400));
    }
    next();
  },
];

const retrieveBorrowerValidator = [
  // Check that the borrower exists by ID
  param('id').custom(async (id) => {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      throw new NotFoundError('Borrower not found');
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

const deleteBorrowerValidator = [
  // Check that the borrower exists by ID
  param('id').custom(async (id) => {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      throw new NotFoundError('Borrower not found');
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



module.exports = {
  addBorrowerValidator,
  updateBorrowerValidator,
};
