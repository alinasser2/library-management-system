const borrowRepository = require('../repositories/borrowRepository');
const NotFoundError = require('../exceptions/NotFoundError');
const bookRepository = require('../repositories/bookRepository');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class BorrowService {
  async borrowBook(bookId, userId, dueDate) {
    const borrowRecord = await borrowRepository.createBorrowRecord({ bookId, userId, dueDate });
    const book = await bookRepository.findById(bookId);
    book.availableQuantity -= 1;
    await book.save();
    return borrowRecord;
  }

  async returnBook(id) {
    const borrow = await borrowRepository.findBorrowById(id); 
    const book = await bookRepository.findById(borrow.bookId);
    borrow.returnDate = new Date();
    book.availableQuantity += 1;
    await book.save();  
    await borrow.save();
    return borrow;
  }

  async listAllBorrows() {
    return borrowRepository.findAllBorrows();
  }


  async listUserBorrowedBooks(userId) {
    return borrowRepository.findBorrowsByUserId(userId);
  }




}

module.exports = new BorrowService();
