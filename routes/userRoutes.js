// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const asyncHandler = require('../utils/asyncHandler');

const {
  addUserValidator,
  updateUserValidator,
} = require('../validators/userValidators');

const router = express.Router();

router.get('/', userController.listUsers);
router.get('/:id', userController.getUser);
router.post('/', addUserValidator, asyncHandler(userController.addUser));
router.put('/:id', updateUserValidator, asyncHandler(userController.updateUser));
router.delete('/:id', asyncHandler(userController.deleteUser));

module.exports = router;


