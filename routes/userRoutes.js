// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const {
  addUserValidator,
  updateUserValidator,
} = require('../validators/userValidators');

const router = express.Router();

router.get('/', userController.listUsers);
router.get('/:id', userController.getUser);
router.post('/', addUserValidator, userController.addUser);
router.put('/:id', updateUserValidator, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;


