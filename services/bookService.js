const bookRepository = require('../repositories/bookRepository');
const CustomException = require('../exceptions/CustomException');
const handler = require('../middlewares/errorHandler');


class BookService {
  async listAllBooks() {
    return await bookRepository.findAll();
  }

  async addBook(bookData) {
    await this.checkIsbnDuplicate(bookData); 
    return await bookRepository.create(bookData);
  }

  async checkIsbnDuplicate(bookData) {
    if (!await this.isIsbnUnique(bookData.isbn)) {
      throw new CustomException('ISBN already exists');
    }
  }

  async updateBook(id, bookData) {
    const book = await this.checkBookExists(id);
    if (bookData.quantity < book.quantity - book.availableQuantity) {
      throw new CustomException('Quantity cannot be less than available quantity');
    }
    if (bookData.quantity !== undefined && bookData.availableQuantity === undefined) {
      const quantityDifference = bookData.quantity - book.quantity;
      bookData.availableQuantity = book.availableQuantity + quantityDifference;
    }
    return await bookRepository.update(id, bookData);
  }

  async deleteBook(id) {
    await this.checkBookExists(id);
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

  async isIsbnUnique(isbn) {
    const book = await bookRepository.findByISBN(isbn);
    return book === null;
  }

  async checkBookExists(id) {
    const book = await bookRepository.findById(id);
    if (book === null) {
      throw new CustomException('Book not found');
    }
    return book;
  }
  
}

module.exports = new BookService();
