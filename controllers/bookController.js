const bookService = require('../services/bookService');

class BookController {

  async addBook(req, res) {
    const bookData = req.body;
    await bookService.addBook(bookData);
    res.status(201).json({ message: 'Book added successfully' });
  }
  
}

module.exports = new BookController();
