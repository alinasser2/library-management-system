const express = require('express');
const bookController = require('../controllers/bookController');
const { addBookValidator } = require('../validators/bookValidator');

const router = express.Router();

router.post(
    '/',
    addBookValidator, // Use the addBookValidator
    bookController.addBook
  );


module.exports = router;
