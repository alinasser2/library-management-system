const express = require('express');
const { addBookValidator, updateBookValidator, deleteBookValidator , retrieveBookValidator} = require('../validators/bookValidator');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Retrieve all books and add a new book
router.route('/').get(bookController.listBooks).post(addBookValidator, bookController.addBook)

// Retrieve, update and delete a book
router.route('/:id').get(retrieveBookValidator, bookController.getBook).put(updateBookValidator, bookController.updateBook).delete(deleteBookValidator, bookController.deleteBook)

// Search book by title
// router.get('/search/:query', bookController.searchBook)

module.exports = router;
