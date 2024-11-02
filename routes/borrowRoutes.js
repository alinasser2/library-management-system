// routes/borrowRoutes.js
const express = require('express');
const borrowController = require('../controllers/borrowController');
const { borrowBookValidator } = require('../validators/borrowValidators');

const router = express.Router();

router.post('/borrow', borrowBookValidator, borrowController.borrowBook);
router.put('/return/:id', borrowController.returnBook);
router.get('/', borrowController.listBorrows);

module.exports = router;