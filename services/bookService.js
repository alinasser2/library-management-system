const bookRepository = require('../repositories/bookRepository');

class BookService {
    
  async addBook(bookData) {
    return await bookRepository.save(bookData);
  }

}

module.exports = new BookService();
