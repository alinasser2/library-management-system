const { body, validationResult, param } = require('express-validator');
const createErrorResponse = require('../resources/errorResource');
const { User } = require('../models'); // This assumes you have an index file that exports all modelsconst CustomException = require('../exceptions/CustomException');
const CustomException = require('../exceptions/CustomException');
const validatorMiddleware = require('../middlewares/validatorMiddleware');


const addUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Email is required and should be valid'),

  // Final validation result check
  validatorMiddleware
];

const updateUserValidator = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Email should be valid'),
  validatorMiddleware
];



module.exports = {
  addUserValidator,
  updateUserValidator,
};
