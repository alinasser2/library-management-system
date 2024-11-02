const { body, validationResult, param } = require('express-validator');
const createErrorResponse = require('../resources/errorResource');
const { User } = require('../models'); // This assumes you have an index file that exports all modelsconst DuplicateEntryError = require('../exceptions/DuplicateEntryError');
const NotFoundError = require('../exceptions/NotFoundError');

const addUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Email is required and should be valid')
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new DuplicateEntryError('User with this email already exists');
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

const updateUserValidator = [
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

const retrieveUserValidator = [
  // Check that the user exists by ID
  param('id').custom(async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User not found');
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

const deleteUserValidator = [
  // Check that the user exists by ID
  param('id').custom(async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User not found');
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
  addUserValidator,
  updateUserValidator,
};
