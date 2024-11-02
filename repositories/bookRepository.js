const Book = require('../models/bookModel');

class BookRepository {

  async save(bookData) {
    return await Book.create(bookData);
  }

}

module.exports = new BookRepository();
