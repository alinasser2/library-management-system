const express = require('express');
const { addBookValidator, updateBookValidator, deleteBookValidator, retrieveBookValidator} = require('../validators/bookValidator');
const bookController = require('../controllers/bookController');

const router = express.Router();

// List all books
router.get('/', bookController.listBooks);

// Get a specific book by ID
router.get('/search/', retrieveBookValidator, bookController.getBook);

// Add a new book
router.post('/', addBookValidator, bookController.addBook);

// Update a book by ID
router.patch('/:id', updateBookValidator, bookController.updateBook);

// Delete a book by ID
router.delete('/:id', deleteBookValidator, bookController.deleteBook);

module.exports = router;
