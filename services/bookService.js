const bookRepository = require('../repositories/bookRepository');

class BookService {
  async listAllBooks() {
    return await bookRepository.findAll();
  }

  async getBook(id) {
    return await bookRepository.findById(id);
  }

  async addBook(bookData) {
    return await bookRepository.create(bookData);
  }

  async updateBook(id, bookData) {
    return await bookRepository.update(id, bookData);
  }

  async deleteBook(id) {
    return await bookRepository.delete(id);
  }

  async getBookByISBN(ISBN) {
    return await bookRepository.findByISBN(ISBN);
  }

  async searchBook(query) {
    return await bookRepository.search(query);
  }
  
}

module.exports = new BookService();
