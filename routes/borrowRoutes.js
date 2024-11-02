// routes/borrowRoutes.js
const express = require('express');
const borrowController = require('../controllers/borrowController');
const { borrowBookValidator, returnBookValidator } = require('../validators/borrowValidators');

const router = express.Router();

router.post('/borrow', borrowBookValidator, borrowController.borrowBook);
router.patch('/return/:id', returnBookValidator, borrowController.returnBook);
router.get('/', borrowController.listBorrows);
router.get('/user/:userId', borrowController.listUserBorrowedBooks);

module.exports = router;