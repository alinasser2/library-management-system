// routes/borrowRoutes.js
const express = require('express');
const borrowController = require('../controllers/borrowController');
const { borrowBookValidator, returnBookValidator } = require('../validators/borrowValidators');
const asyncHandler = require('../utils/asyncHandler');


const router = express.Router();

router.post('/borrow', borrowBookValidator, asyncHandler(borrowController.borrowBook));
router.patch('/return/:id', returnBookValidator, asyncHandler(borrowController.returnBook));
router.get('/', borrowController.listBorrows);
router.get('/user/:userId', borrowController.listUserBorrowedBooks);

module.exports = router;