const bookService = require('../services/bookService');
const BookResource = require('../resources/BookResource');
const asyncHandler = require('../utils/asyncHandler');


class BookController {

  
  async listBooks(req, res) {
    const books = await bookService.listAllBooks();
    res.json({
      status: 'success',
      data: BookResource.collection(books),
    });
  }

  async getBook(req, res) {
    console.log('getBook');
    const books = await bookService.searchBook(req.query);
    res.json({
      status: 'success',
      data: BookResource.collection(books),
    });
  }

  async addBook(req, res) {
    const bookData = req.body;
    const newBook = await bookService.addBook(bookData);
    res.status(201).json({
      status: 'success',
      data: new BookResource(newBook),
    });
  }

  async updateBook(req, res) {
    const bookData = req.body;
    const updatedBook = await bookService.updateBook(req.params.id, bookData);
    res.json({
      status: 'success',
      data: new BookResource(updatedBook),
    });
  }

  async deleteBook(req, res, next) {
    await bookService.checkBookExists(req.params.id);
    await bookService.deleteBook(req.params.id);
    res.json({
      status: 'success',
      message: 'Book deleted successfully',
    });
  }

  // serach book by title
  async searchBook(req, res) {
    const books = await bookService.searchBook(req.query);
    res.json({
      status: 'success',
      data: BookResource.collection(books),
    });
  }
}

module.exports = new BookController();
