const bookRepository = require('../repositories/bookRepository');
const NotFoundError = require('../exceptions/NotFoundError');

class BookService {
  async listAllBooks() {
    return await bookRepository.findAll();
  }

  async addBook(bookData) {
    return await bookRepository.create(bookData);
  }

  async updateBook(id, bookData) {
    const book = await bookRepository.findById(id);
    if (bookData.quantity !== undefined && bookData.availableQuantity === undefined) {
      console.log('book.quantity', book.quantity);
      const quantityDifference = bookData.quantity - book.quantity;
      bookData.availableQuantity = book.availableQuantity + quantityDifference;
    }
    console.log('bookData', bookData);
    return await bookRepository.update(id, bookData);
  }

  async deleteBook(id) {
    return await bookRepository.delete(id);
  }


  async searchBook(query) {
    const books = await bookRepository.search(query);
    return books;
  }

  async getBookByISBN(ISBN) {
    const book = await bookRepository.findByISBN(ISBN);
    return book;
  }
  
}

module.exports = new BookService();
